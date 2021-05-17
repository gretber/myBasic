/**
 * Application
 */

// Core
import React, {
    Fragment,
    FunctionComponent,
    useEffect,
    useState,
    useRef,
    useCallback
} from 'react'
import {
    BryntumScheduler,
} from '@bryntum/scheduler-react';
import { EventModel } from '@bryntum/scheduler/scheduler.umd.js';

// Config
import { schedulerConfig } from './AppConfig';
import './App.scss';

// Components
import { NavigationPanel } from './containers/NavigationPanel';

// Material
import CircularProgress from '@material-ui/core/CircularProgress';

// Data
import { useDataQuery } from './bus/briks';

// Helpers
import { formatDate } from './helpers/formatDate';
import { swap } from './helpers/swapElArr';
import { sortSelectedRegions } from './helpers/sortSelectedRegions';
import { sortSelectedFabriks } from './helpers/sortSelectedFabriks';

// Moment
import moment from 'moment';

// Types
import { Team, Project, SelectionValue } from './bus/briks/dataTypes';

const App: FunctionComponent = () => {

    // Ref
    const schedulerRef = useRef<typeof BryntumScheduler | null>(null);

    // Init state
    const [events, setEvents] = useState<Array<Project> | []>([]);
    const [resources, setResources] = useState<Array<SelectionValue> | []>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);
    const [config, setConfig] = useState({...schedulerConfig});

    // Get data
    const { data, loading } = useDataQuery()

    useEffect(()=> {

        if("root" in data){

            // Set Config
            setConfig( (prevState: any) => {
                const newState = { ...prevState }
                const startDate = moment(data.root.view.startDate, "DD/MM/YYYY").toDate()
                const endDate = moment(data.root.view.endDate, "DD/MM/YYYY").toDate()

                newState.startDate = startDate
                newState.endDate = endDate

                return newState
            })

            // Transform data
            const transformedProjects = data.root.projects.project.map((item) => {
                item["resourceId"] = item["teamId"];

                if(!("eventColor" in item)){
                    item["eventColor"] = item["color"];
                    item.eventColor = `#${item.eventColor}`;
                }
                return { ...item, startDate: formatDate(swap(item.startDate))!, endDate: formatDate(swap(item.endDate))! }
            })

            // Sort Fabrik
            const selectionFabriks = data.root.selections.selection[2].values.value
            const sortedFabriks = sortSelectedFabriks(transformedProjects, selectionFabriks)
            const selectedFabriksCount = selectionFabriks.filter( (item: any) => item["-selected"] === true )

            if(selectedFabriksCount.length === 0){

                // Sort by selected Teams
                const selectionTeams = data.root.selections.selection[0].values.value.filter( (item: any) => item['-selected'] === true )
                
                // Transform teams ( add resourceId, id fields )
                const copySelectionTeams = [...selectionTeams]
                copySelectionTeams.map( (item: any) =>  {
                    item["resourceId"] = item["-id"]
                    item["id"] = item["-id"]
                })

                // Sort Regions
                const selectionRegion = data.root.selections.selection[1].values.value
                const sortedRegions = sortSelectedRegions(transformedProjects, selectionRegion)

                setEvents(sortedRegions);
                setResources(copySelectionTeams);

            } else {

                // Sorted Teams
                const selectionTeams = data.root.selections.selection[0].values.value.filter( (item: any) => item['-selected'] === true )
                
                // Transform teams
                const copySelectionTeams = [...selectionTeams]
                copySelectionTeams.map( (item: any) =>  {
                    item["resourceId"] = item["-id"]
                    item["id"] = item["-id"]
                })
                // Sort Regions
                const selectionRegion = data.root.selections.selection[1].values.value
                const sortedRegions = sortSelectedRegions(sortedFabriks, selectionRegion)

                const events = sortedRegions.filter( (item: any) => {
                    // Project date
                    const projectStartDate = moment(item.startDate, "YYYY-MM-DD").unix()
                    const projectEndDate = moment(item.endDate, "YYYY-MM-DD").unix()

                    // View date
                    const viewStartDate = moment(config.startDate).unix()
                    const viewEndDate = moment(config.endDate).unix()

                    return projectEndDate > viewStartDate || projectStartDate < viewEndDate
                })

                const sortTeams: any = []

                 copySelectionTeams.map( (team: any) => {
                    const hasIvent = sortedRegions.find( (event: any) => {
                        return event.teamId === team.id
                    })

                    if (hasIvent){
                        sortTeams.push(team)
                    }
                })

                setEvents(events);
                setResources(sortTeams);
            }
        }

    }, [data, loading])

    // event selection change handler
    const onEventSelectionChange = useCallback(({ selected }: { selected: EventModel[] }) => {
        console.log(selected[0])
        setSelectedEvent(selected.length ? selected[0] : null);
    }, []);

    const beforeEventEditShow = (event: any) => {
        //console.log("event.eventRecord.data", event.eventRecord.data)


        


        // Current id
        const regionId = event.eventRecord.data.regionId;
        const leaderId = event.eventRecord.data.leaderId;
        const factoryId = event.eventRecord.data.factoryId;

        // Get fields
        const region = event.editor.widgetMap.region;
        const project = event.editor.widgetMap.project
        const varighed = event.editor.widgetMap.varighed;
        const weekendWork = event.editor.widgetMap.weekendWork;
        const jobType = event.editor.widgetMap.jobType;
        const team = event.editor.widgetMap.team;
        const leader = event.editor.widgetMap.leader;
        const factory = event.editor.widgetMap.factory;

        if("root" in data){
            // Region
            const currentRegion = data.root.districs.district.find( item => item.id === regionId)
            region.items = data.root.districs.district.map( item => item.name)
            region.placeholder = currentRegion?.name
            region.value = currentRegion?.name

            // Project 
            const projectNo: any = event.eventRecord.data.projectNo
            const getProjectDetails = async (projectNo: any) => {
                const projectDetails = process.env.REACT_APP_GET_PROJECT_DETAILS;

                const encoded = window.btoa('lei-lmk:AAABBB')
                const response = await fetch(`${projectDetails}${projectNo}`, {
                        method:  'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Basic ${encoded}`,
                        },
                    });

                        
                const projects: any = await response.json();
                console.log("project", projects.root.projects.project[0])
                const modifyingItem = projects.root.projects.project[0]
                project.value = `${modifyingItem.projectNo} - ${modifyingItem.name}`
            };

            const selectionProjectDetails = async ( regionId: string ) => {
                const exportSelectionListProjectDetails = process.env.REACT_APP_SELECTION_PROJECT_DETAILS;

                const encoded = window.btoa('lei-lmk:AAABBB')
                const response = await fetch(`${exportSelectionListProjectDetails}${regionId}`, {
                        method:  'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Basic ${encoded}`,
                        },
                    });

                        
                const projects: any = await response.json();
                console.log("projects", projects.root.projectsList.projectNo)   
                project.items = projects.root.projectsList.projectNo.map((item: any)=> `${item.id} - ${item.name}`)
            };

            if(regionId){
                selectionProjectDetails(regionId)
            }
            
            if(!(projectNo === 'null')){
                console.log("projectNo", projectNo)
                project.value = getProjectDetails(projectNo)
            }

            // Varighed
            varighed.value = event.eventRecord.data.duration

            // Weekend arbejde
            weekendWork.checked = event.eventRecord.data.weekendWork

            // Job Type
            jobType.items = data.root.jobTypes.jobType.map( item => item.name)
            jobType.placeholder = event.eventRecord.data.jobType

            // Hold
            team.items = data.root.teams.team.map( item => item.name)
            team.placeholder = event.eventRecord.data.teamId

            // Enterprise leder
            const currentLeader = data.root.leaders.leader.find( item => item.id === leaderId)
            leader.items = data.root.leaders.leader.map( item => item.name)
            leader.placeholder = currentLeader?.name

            // Fabrik
            const currentFactory = data.root.factories.factory.find( item => item.id === factoryId)
            factory.items = data.root.factories.factory.map( item => item.name)
            factory.placeholder = currentFactory?.name
        }
    };

    const handlerOnBeforeSave = (event: any) => {
        console.log("On save", event)
    }

    const handlerOnEventResize = (event: any ) => {
        console.log("Resize", event)
    } 

    if(loading){
        return (
            <Fragment>
                {(Object.keys(data).length !== 0) && <NavigationPanel />}
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "500px", marginBottom: "500px"}}>
                    <CircularProgress color="primary" />
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <NavigationPanel />
            <BryntumScheduler
                ref={schedulerRef}
                {...config}
                events={events}
                resources={resources}
                barMargin={3}
                onBeforeEventResizeFinalize={handlerOnEventResize}
                onBeforeEventSave={handlerOnBeforeSave}
                onEventSelectionChange={onEventSelectionChange}
                onBeforeEventEditShow={beforeEventEditShow}
            />
        </Fragment>
    );
};

export default App;
