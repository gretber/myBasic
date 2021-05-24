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
import { lagInDays } from '../src/helpers/lagInDays';
import { addDays } from '../src/helpers/addDays';
import { subDays } from '../src/helpers/subDays';

// API
import { getAllCustomers } from './editEventAPI/getAllCustomers';
import { getProjectDetails } from './editEventAPI/getProjectDetails';
import { selectionProjectDetails } from './editEventAPI/selectionProjectDetails';
import { getFabrikVare } from './editEventAPI/getFabrikVare';
import { updateProject } from './onSaveAPI/updateProject';

// Moment
import moment from 'moment';

// Types
import { Team, Project, SelectionValue } from './bus/briks/dataTypes';

const App: FunctionComponent = () => {

    const initialBrik = {
    id: null,
    regionId: "",
    leaderId: "",
    projectNo: null,
    factoryItemName: "",
    factoryItemId: null,
    customerId: null,
    customerName: null,
    state: "2",
    status: "",
    name: "",
    name2: "",
    startDate: "",
    endDate: "",
    duration: 0,
    weekendWork: false,
    jobType: null,
    teamId: "",
    factoryId: "",
    tons: 0.0,
    area: 0.0,
    color: "",
    details: ""
  }

    // Ref
    const schedulerRef = useRef<typeof BryntumScheduler | null>(null);

    // Init state
    const [events, setEvents] = useState<Array<Project> | []>([]);
    const [resources, setResources] = useState<Array<SelectionValue> | []>([]);
    const [config, setConfig] = useState({...schedulerConfig});

    // Edit brik states
    const [editBrik, setEditBrik] = useState(initialBrik)

    // Get data
    const { data, loading } = useDataQuery()

    useEffect(()=> {

        if("root" in data){

            // Set Config
            setConfig( (prevState: any) => {
                const newState = { ...prevState }
                const startDate = moment(data.root.view.startDate, "DD/MM/YYYY").toDate()
                const endDate = moment(data.root.view.endDate, "DD/MM/YYYY").toDate()

                // newState.startDate = startDate
                // newState.endDate = endDate

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
    // const onEventSelectionChange = useCallback(({ selected }: { selected: EventModel[] }) => {
    //     console.log(selected[0])
    //     setSelectedEvent(selected.length ? selected[0] : null);
    // }, []);

    const beforeEventEditShow = (event: any) => {

        console.log("event.eventRecord.data", event.eventRecord.data)

        setEditBrik( (prevState: any) =>{
            const newState = {
                ...prevState,
                id:              event.eventRecord.data.id,
                regionId:        event.eventRecord.data.regionId,
                leaderId:        event.eventRecord.data.leaderId,
                projectNo:       event.eventRecord.data.projectNo,
                factoryItemName: event.eventRecord.data.factoryItemName,
                factoryItemId:   event.eventRecord.data.factoryItemId,
                customerId:      event.eventRecord.data.customerId,
                customerName:    event.eventRecord.data.customerName,
                state:           event.eventRecord.data.state,
                status:          event.eventRecord.data.status,
                name:            event.eventRecord.data.name,
                name2:           event.eventRecord.data.name,
                startDate:       moment(event.eventRecord.data.startDate).format("DD/MM/YYYY"),
                endDate:         moment(event.eventRecord.data.endDate).format("DD/MM/YYYY"),
                duration:        event.eventRecord.data.duration,
                weekendWork:     event.eventRecord.data.weekendWork,
                jobType:         event.eventRecord.data.jobType,
                teamId:          event.eventRecord.data.teamId,
                factoryId:       event.eventRecord.data.factoryId,
                tons:            event.eventRecord.data.tons,
                area:            event.eventRecord.data.area,
                color:           event.eventRecord.data.color,
                details:         event.eventRecord.data.details,
            }
            return newState
        })

        // Current data
        const regionId        = event.eventRecord.data.regionId;
        const leaderId        = event.eventRecord.data.leaderId;
        const factoryId       = event.eventRecord.data.factoryId;
        const projectNo: any  = event.eventRecord.data.projectNo;
        const name2           = event.eventRecord.data.name2;
        const state           = event.eventRecord.data.state;
        const factoryItemName = event.eventRecord.data.factoryItemName;


        // Get fields
        const region         = event.editor.widgetMap.region;
        const project        = event.editor.widgetMap.project;
        const arbejdsplads   = event.editor.widgetMap.arbejdsplads;
        const varighed       = event.editor.widgetMap.varighed;
        const weekendWork    = event.editor.widgetMap.weekendWork;
        const jobType        = event.editor.widgetMap.jobType;
        const team           = event.editor.widgetMap.team;
        const status         = event.editor.widgetMap.status;
        const clip           = event.editor.widgetMap.clip;
        const leader         = event.editor.widgetMap.leader;
        const factory        = event.editor.widgetMap.factory;
        const fabrikVare     = event.editor.widgetMap.fabrikVare;
        const kundeNavn      = event.editor.widgetMap.kundeNavn;
        const kalkuleBesk    = event.editor.widgetMap.kalkuleBesk;
        const startDateField = event.editor.widgetMap.startDateField;
        const endDateField   = event.editor.widgetMap.endDateField;


        if("root" in data){
            // Region
            const currentRegion = data.root.districs.district.find( item => item.id === regionId)
            region.items = data.root.districs.district.map( item => item.name)
            region.onChange = (event: any) => {
                const currentRegion = data.root.districs.district.find( (item: any) => item.name === event.value)
                setEditBrik((prevState: any) => {
                    const newState = { ...prevState }
                    return {...newState, regionId: currentRegion?.id}
                })
            }
            region.value = currentRegion?.name

            // On regeon select
            region.onSelect = (event: any) => {
                if(event.record){
                    const currentRegionId = data.root.districs.district.find( item => item.name === event.record.data.text)
                    selectionProjectDetails(currentRegionId?.id, project)
                }
            }

            // Kunde Navn
            kundeNavn.onSelect = (event: any) => {
                if(event.record){
                    getAllCustomers(kundeNavn, event.record.data.text, setEditBrik)
                }
            }
            getAllCustomers(kundeNavn, kundeNavn.value, setEditBrik)

            // Fabrik
            const currentFactory = data.root.factories.factory.find( item => item.id === factoryId)
            factory.items = data.root.factories.factory.map( item => item.name)
            factory.value = currentFactory?.name
            factory.onChange = (event: any) => {
                const currentFactory = data.root.factories.factory.find( item => item.name === event.value)
                getFabrikVare(currentFactory?.id, fabrikVare, '', setEditBrik)
            }

            // Fabrik vare
            getFabrikVare(factoryId, fabrikVare, factoryItemName, setEditBrik)
            fabrikVare.onSelect = (event: any) => {
                if(event.record) {
                    getFabrikVare(currentFactory?.id, fabrikVare, event.record.data.text, setEditBrik)
                }
            }

            // Project
            if(regionId){
                selectionProjectDetails(regionId, project)
            }

            if(projectNo !== 'null'){
                getProjectDetails(projectNo, project, arbejdsplads, kundeNavn, factory, data, setEditBrik)
                region.disabled = true
                kundeNavn.disabled = true
            } else {
                project.value = ''
                region.disabled = false
                kundeNavn.disabled = false
            }

            project.onSelect = (event: any) => {
                if(event.record && event.record.data.parentIndex){
                    const selectProject = event.record.data.text.split('-')
                    arbejdsplads.value = selectProject[1].trim()
                    getProjectDetails(selectProject[0].trim(), project, arbejdsplads, kundeNavn, factory, data, setEditBrik)
                }

                region.disabled = true
                kundeNavn.disabled = true
            }

            project.onClear = () => {
                arbejdsplads.value = ''
                kundeNavn.value = ''
                region.disabled = false
                kundeNavn.disabled = false
            }

            // Weekend arbejde
            weekendWork.checked = event.eventRecord.data.weekendWork
            // weekendWork.onChange = (event: any) => {
            //     //varighed.value = lagInDays(startDateField.value, endDateField.value, weekendWork.value)
            // }

            // Start date handler
            startDateField.onChange = (event: any) => {
                if(event){
                    setEditBrik((prevState: any) => {
                        const newState = {...prevState}
                        return {...newState, startDate: moment(event.value).format("DD/MM/YYYY")}
                    })                    
                }
                // Start date cannot be higher than the end date
                if(endDateField.value.getTime() < event.value.getTime()){
                    endDateField.value = event.value
                    varighed.value = lagInDays(event.value, event.value, true)
                } else {
                    varighed.value = lagInDays(startDateField.value, endDateField.value, true)
                }
            }

            // End date handler
            endDateField.onChange = (event: any) => {
                if(event){
                    setEditBrik((prevState: any) => {
                        const newState = {...prevState}
                        return {...newState, endDate: moment(event.value).format("DD/MM/YYYY")}
                    })                    
                }
                // End date cannot be less than the start
                if(event.value.getTime() < startDateField.value.getTime()){
                    startDateField.value = event.value
                    varighed.value = lagInDays(event.value, event.value, true)
                } else {
                    varighed.value = lagInDays(startDateField.value, endDateField.value, true)
                }
            }

            // Kalkule Besk
            kalkuleBesk.value = name2

            // Varighed
            varighed.value = lagInDays(startDateField.value, endDateField.value, true)
            setEditBrik((prevState: any) => {
                    const newState = {...prevState}
                    return {...newState, duration: varighed.value}
            })

            varighed.onChange = (event: any) => {
                if(event.value-1 == event.oldValue){
                    endDateField.value = addDays(endDateField.value, 1)
                } else if(event.value+1 == event.oldValue) {
                    endDateField.value = subDays(endDateField.value, 1)
                }
                setEditBrik((prevState: any) => {
                    const newState = {...prevState}
                    return {...newState, duration: event.value}
                })
            }

            // State
            let type =''
        
            switch (state) {
                case "1":
                    type = 'Budgetteret'
                    break
                case "2":
                    type = 'Planlagt'
                    break
                case "3":
                    type = 'Udført Sag'
                    break
                case "4":
                    type = 'Slettet'
                    break
                default: type = ''
            }

            status.value = type
            status.onSelect = (event: any) => {
                let status = ''
                if(event.record){
                    switch (event.record.data.text) {
                        case 'Budgetteret':
                            status = '1'
                            break
                        case 'Planlagt':
                            status = '2'
                            break
                        case 'Udført Sag':
                            status = '3'
                            break
                        case 'Slettet':
                            status = '4'
                            break
                        default: type = ''
                    }
                    setEditBrik((prevState: any) => {
                        const newState = {...prevState}
                        return {...newState, state: status}
                    })
                }
            }

            // Clip
            if(event.eventRecord.data.status == '0'){
                clip.value = false
            } else if(event.eventRecord.data.status == '2'){
                clip.value = true
            }

            clip.onChange = (event: any)=>{
                if(event){
                    if(event.checked){
                        setEditBrik((prevState: any) => {
                            const newState = {...prevState}
                            return {...newState, status: "2"}
                        })
                    } else {
                        setEditBrik((prevState: any) => {
                            const newState = {...prevState}
                            return {...newState, status: "0"}
                        })
                    }
                }
            }
        

            // Job Type
            jobType.items = data.root.jobTypes.jobType.map( item => item.name)

            if(event.eventRecord.data.jobType !== "null"){
                let jType = ''
                switch(event.eventRecord.data.jobType){
                    case "1":
                        jType = "Fræs"
                        break
                    case "2":
                        jType = "Striber"
                        break
                    case "3":
                        jType = "Opretning"
                        break
                    default: jType = ''
                }
                jobType.value = jType
            } else {
                jobType.value = ''
            }

            // Hold
            team.items = data.root.teams.team.map( item => item.name)
            team.value = event.eventRecord.data.teamId

            // Enterprise leder
            const currentLeader = data.root.leaders.leader.find( item => item.id === leaderId)
            leader.items = data.root.leaders.leader.map( item => item.name)
            leader.value = currentLeader?.name
            leader.onSelect = (event: any) => {
                if(event.record && event.record.data){
                    const currentLeader = data.root.leaders.leader.find( item => item.name === event.record.data.text)
                    setEditBrik((prevState: any) => {
                        const newState = { ...prevState }
                        return {...newState, leaderId: currentLeader?.id}
                    })
                }
            }
        }
    };

    const handlerOnAfterEventDrop = (event: any) => {
        console.log("On after event drop", event)
    }

    const handlerOnBeforeSave = (event: any) => {
        if("root" in data){
            // Region
            const currentRegion = data.root.districs.district.find( (item: any) => item.name === event.values.region)
            // Leader
            const currentLeader = data.root.leaders.leader.find( (item: any) => item.name === event.values.leader)
            // Project
            let projectNumber = 'null'
            if(event.values.projec&&event.values.projec.length>0&&event.values.projec !== 'null'){

                projectNumber = event.values.projec.split("-")[0].trim()
            }

            console.log("On save event", event)
            const body = {
                id: editBrik.id,
                regionId: currentRegion?.id,
                leaderId: currentLeader?.id,
                projectNo: projectNumber,
                factoryItemName: "",
                factoryItemId: null,
                customerId: null,
                customerName: null,
                state: "2",
                status: "",
                name: "",
                name2: "",
                startDate: "",
                endDate: "",
                duration: 0,
                weekendWork: false,
                jobType: null,
                teamId: "",
                factoryId: "",
                tons: 0.0,
                area: 0.0,
                color: "",
                details: ""
            }
            //updateProject(body)
            console.log("On save", editBrik)

        }
    }

    const handlerOnEventResize = (event: any ) => {
        console.log("Resize", event)
        console.log("event.eventRecord", event.resourceRecord)
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
                name="123"
                {...config}
                events={events}
                resources={resources}
                barMargin={3}
                onBeforeEventResizeFinalize={handlerOnEventResize}
                onBeforeEventSave={handlerOnBeforeSave}
                onAfterEventDrop={handlerOnAfterEventDrop}
                //onEventSelectionChange={onEventSelectionChange}
                onBeforeEventEditShow={beforeEventEditShow}
            />
        </Fragment>
    );
};

export default App;
