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
    useCallback,
    createFactory
} from 'react'
import {
    BryntumScheduler,
} from '@bryntum/scheduler-react';
import { EventModel } from '@bryntum/scheduler/scheduler.umd.js';

// Config
import { schedulerConfig, eventRecordData, configFeatures } from './AppConfig';
import { schedulerConfig2 } from './AppConfig2';
import './App.scss';

// Containers
import { NavigationPanel } from './containers/NavigationPanel';

// Components
// import Popup from './components/popup/popup';

// Material
import CircularProgress from '@material-ui/core/CircularProgress';

// Data
import { useDataQuery } from './bus/briks';

// Helpers
import { formatDate } from './helpers/formatDate';
import { swap } from './helpers/swapElArr';
import { sortSelectedRegions } from './helpers/sortSelectedRegions';
import { sortSelectedFabriks } from './helpers/sortSelectedFabriks';
import { lagInDays } from './helpers/lagInDays';
import { addDays } from './helpers/addDays';
import { subDays } from './helpers/subDays';
import { transformFactoriesEvents } from './helpers/transformFactoriesEvents';
import {convertDate} from './helpers/convertDate'

// API
import { getAllCustomers } from './API/editEventAPI/getAllCustomers';
import { getProjectDetails } from './API/editEventAPI/getProjectDetails';
import { selectionProjectDetails } from './API/editEventAPI/selectionProjectDetails';
import { getFabrikVare } from './API/editEventAPI/getFabrikVare';
import { updateProject } from './API/onSaveAPI/updateProject';
import { deleteProject } from './API/onDeleteAPI/deleteProject';
import { dropProject } from './API/onDropAPI/dropProject';
import { onResizeProject } from './API/onResize/onResizeProject';
import {copyBrik} from './bus/briks/api/copyBrik';

// Moment
import moment from 'moment';

// Types
import { Factory, Project, SelectionValue, SelectionType } from './bus/briks/dataTypes';

import Popup from './elements/popup/Popup';

export const App: FunctionComponent = () => {

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
    calculatedDuration: 0,
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
    const schedulerRef1 = useRef<typeof BryntumScheduler | null>(null);
    const schedulerRef2 = useRef<typeof BryntumScheduler | null>(null);

    // Init state

    const [topEvents, setTopEvents] = useState<Array<Project> | []>([]);
    const [topResources, setTopResources] = useState<Array<SelectionValue> | []>([]);

    const [bottomEvents, setBottomEvents] = useState<any>([]);
    const [bottomResources, setBottomResources] = useState<any>([]);

    const [config, setConfig] = useState({...schedulerConfig});
    const [config2, setConfig2] = useState({...schedulerConfig2});
    const [period, setPeriod] = useState('');




const [popupShown, showPopup] = useState(false);
    const [eventRecord, setEventRecord] = useState(null);
    const [eventStore, setEventStore] = useState(null);
    const [resourceStore, setResourceStore] = useState(null);

    useEffect(() => {
        const { eventStore, resourceStore } = schedulerRef1.current.instance;
        setEventStore(eventStore);
        setResourceStore(resourceStore);
    }, []);

    const showEditor = useCallback(eventRecord => {
        setEventRecord(eventRecord);
        showPopup(true);
    }, []);

    const hideEditor = useCallback(() => {
        setEventRecord(null);
        showPopup(false);
    }, []);

    // Edit brik states
    const [editBrik, setEditBrik] = useState(initialBrik)

    // Displayed Date in header
    const [offLineEndDate, saveOffLineEndDate] = useState(new Date());
    // Get data
    const { data, loading } = useDataQuery();
    // console.log('\n\n', {data}, '\n\n');

    useEffect(()=> {

        if("root" in data){

            // Set Config
            setConfig( (prevState: any) => {
                const newState = { ...prevState }
                const startDate = moment(data.root.view.startDate, "DD/MM/YYYY").toDate()
                const endDate = moment(data.root.view.endDate, "DD/MM/YYYY").toDate()
                
                newState.startDate = startDate
                newState.endDate = endDate
                saveOffLineEndDate(config.endDate);

                if(data.root.view.timeframe === 'week')
                {
                    setPeriod('Uge')
                    newState.viewPreset = 'myDayAndWeekPreset';
                }
                else if(data.root.view.timeframe === '2weeks')
                {
                    setPeriod('To uges')
                    newState.viewPreset = 'myDayAndWeekPreset';
                }
                else if(data.root.view.timeframe === 'month')
                {
                    setPeriod('Måned');
                    newState.viewPreset = 'myDayAndMonthPreset';
                }
                else {
                    setPeriod('24 uger');
                    newState.viewPreset = 'my24WeeksPreset';
                }
                setPeriod(data.root.view.timeframe)

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
            const selectedFabriksCount = selectionFabriks.filter( item => item["-selected"] === true )
            // console.log({selectedFabriksCount});

            if(selectedFabriksCount.length === 0){
                // console.log('selectedFabriksCount.length === 0');
                // Sort by selected Teams
                const selectionTeams = data.root.selections.selection[0].values.value.filter( (item: SelectionValue) => item['-selected'] === true )
                
                // Transform teams ( add resourceId, id fields )
                const copySelectionTeams = selectionTeams.map( item => {
                    return { ...item }
                })
                copySelectionTeams.map( item =>  {
                    item["id"] = item["-id"]
                })

                // Sort Regions
                const selectionRegion = data.root.selections.selection[1].values.value // All Regions
                const sortedByRegions = sortSelectedRegions(transformedProjects, selectionRegion) // Projects containing selected regions

                const factories = data.root.factories.factory.map( (item: Factory) => {
                    return {...item} 
                })

                const resourseFactoryId = sortedByRegions.map((a: any) => ({...a})); // Copy projects containing selected regions
                console.log({resourseFactoryId})

                resourseFactoryId.map((item: any)=> {  
                    item["resourceId"] = item["factoryId"];  // Resource 
                })

                const transformFactories = transformFactoriesEvents(resourseFactoryId);
                const dropEmptyTons = transformFactories.filter( (item: any) => item.tons !== 0 )

                const activeFactories: any = []
                factories.forEach( forEachItem => {
                    const resultItem = transformFactories.find( (findItem: any) => forEachItem.id === findItem.resourceId)
                    if (resultItem) {
                        activeFactories.push(forEachItem)
                    }
                })

                // console.log("setBottomResources", activeFactories)
                // console.log("setBottomEvents", dropEmptyTons)
                setBottomResources(activeFactories);
                setBottomEvents(dropEmptyTons);


                //console.log("MAIN EVENTS", sortedByRegions)
                setTopResources(copySelectionTeams);
                setTopEvents(sortedByRegions);
                // console.log('copySelectionTeams', copySelectionTeams);
                // console.log({copySelectionTeams, sortedByRegions});


            } else {
                // console.log('selectedFabriksCount.length !== 0');
                // type ISelectionType = 'team' | 'region' | 'factory';

                // const getEntitiesSelectionByType= (data: any, type: ISelectionType) => {
                //     return data.root.selections.selection
                //         .find((selection: {type: SelectionType, values: any}) => selection.type === type)
                //         ?.values
                //         ?.value
                //         ?.filter((entity: any) => entity['-selected'] === true)
                //         ?.map((selectedEntity: any) => selectedEntity['-id']);
                // }


                // const selectedFactoriesIds = getEntitiesSelectionByType(data, 'factory');
                // // const selectedProjects = data.root.projects.project.filter((project: Project) => selectedFactoriesIds?.includes(project.factoryId)) as <Array<Project> | []>;
                // // const selectedTeams = data.root.teams.team.filter((team) => selectedProjects.find((project) => project.teamId === team.id)) as <Array<SelectionValue> | []>;


                // const selectedProjects = data.root.projects.project.filter((project: Project) => selectedFactoriesIds?.includes(project.factoryId));
                // const selectedTeams = data.root.teams.team.filter((team) => selectedProjects.find((project) => project.teamId === team.id));

                // // @ts-ignore
                // setTopEvents(selectedProjects);
                // // @ts-ignore
                // setTopResources(selectedTeams);
                // console.log({resources: selectedTeams, events: selectedProjects});




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
                const sortedByRegions = sortSelectedRegions(sortedFabriks, selectionRegion)

                const events = sortedByRegions.filter( (item: any) => {
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
                    const hasIvent = sortedByRegions.find( (event: any) => {
                        return event.teamId === team.id
                    })

                    if (hasIvent){
                        sortTeams.push(team)
                    }
                })





                setTopEvents(events);
                setTopResources(sortTeams);
                console.log({events, sortTeams})
            }
        }

    }, [data, loading])

    // Drop event handler
    const handlerOnAfterEventDrop = (event: any) => {
        event.context.async = true
        if(event.eventRecords.length>0){
            const data = event.eventRecords[0].data
            dropProject(data)
        }
        }

     // Before save handler
    const handlerOnBeforeSave = useCallback(
        
        (event: any) => {
        event.context.async = true
        let jType = ''
        switch(event.values.jobType){
            case "Fræs":
                jType = "1"
                break
            case "Striber":
                jType = "2"
                break
            case "Opretning":
                jType = "3"
                break
            default: jType = ''
        }

        console.log(jType)

            let currentLeader: any = {}
            let currentFactory: any = {}
            let currentRegion: any = {}
            let projectNo = ''

            if("root" in data){
                currentLeader = data.root.leaders.leader.find( item => item.name === event.values.leader)
                currentFactory = data.root.factories.factory.find( item => item.name === event.values.factory)
                currentRegion = data.root.districs.district.find( item => item.name === event.values.region)
            }

            if(event.values.projec){
                projectNo = event.values.projec.split(" ")[0]
            } else {
                projectNo = ""
            }
            
            console.log("projectNo", projectNo)
            console.log("projectNo", currentLeader)
            console.log("projectNo", currentFactory)
            console.log("projectNo", currentRegion)
         
            const body = {
                id:                 event.eventRecord.data.id,
                regionId:           currentRegion?.id,
                leaderId:           currentLeader?.id,
                projectNo:          projectNo,
                factoryItemName:    event.values.factoryItemName,
                factoryItemId:      event.eventRecord.data.factoryItemId,
                customerId:         event.eventRecord.data.customerId,
                customerName:       event.values.kundeNavn,
                state:              event.eventRecord.data.state,
                status:             event.values.clip,
                name:               event.values.arbejdsplads,
                name2:              event.values.kalkuleBesk,
                startDate:          moment(event.values.startDate).format("DD/MM/YYYY"),
                endDate:            moment(event.values.endDate).format("DD/MM/YYYY"),
                duration:           lagInDays(event.values.startDate, event.values.endDate, true),
                calculatedDuration: event.eventRecord.data.calculatedDuration,
                weekendWork:        event.values.weekendWork,
                jobType:            jType,
                teamId:             event.eventRecord.data.teamId,
                factoryId:          currentFactory.id,
                tons:               event.eventRecord.data.tons,
                area:               event.values.area,
                color:              event.eventRecord.data.color,
                details:            event.eventRecord.data.details,
            }
            console.log("body save", body)
        
            // event.eventRecord.setData("duration", 5)
            // event.values.duration = 5
            console.log("event save", event)
           
        
        updateProject(body)
        event.context.finalize()
    },[])

    const handlerOnAfterSave = (event: any) => {
    }


       // Resize event handler
    const handlerOnEventResizeEnd = (event: any) => {

        if(event.eventRecord){
            const data = { ...event.eventRecord.originalData }
            delete data.resourceId
            delete data.eventColor

            const startDate = moment(event.eventRecord.data.startDate).format("DD/MM/YYYY")
            const endDate = moment(subDays(event.eventRecord.data.endDate, 1)).format("DD/MM/YYYY")
            const duration = lagInDays(event.eventRecord.data.startDate,event.eventRecord.data.endDate, true)-1

            onResizeProject({...data, startDate, endDate, duration})

        }
    }

    // Delete event handler
    const handlerOnAfterEventDelete = (event: any) => {
        event.context.async = true
        if(event.eventRecords.length>0){
            const id = event.eventRecords[0].data.id
            deleteProject(id)
        }
    }

    // On Copy click
        const handlerOnCopy = () => {
     
        const projectCopy = {
            id: 'null',          
            regionId:           eventRecordData.regionId,
            leaderId:           eventRecordData.leaderId,
            projectNo:          eventRecordData.projectNo,
            factoryItemName:    eventRecordData.factoryItemName,
            factoryItemId:      eventRecordData.factoryItemId,
            customerId:         eventRecordData.customerId,
            customerName:       eventRecordData.customerName,
            state:              eventRecordData.state,
            status:             eventRecordData.status,
            name:               eventRecordData.name,
            name2:              eventRecordData.name2,
            startDate:          moment(eventRecordData.startDate).format("DD/MM/YYYY"),
            endDate:            moment(eventRecordData.endDate).format("DD/MM/YYYY"),
            duration:           eventRecordData.duration,
            calculatedDuration: eventRecordData.duration,
            weekendWork:        eventRecordData.weekendWork,
            jobType:            eventRecordData.jobType,
            teamId:             eventRecordData.teamId,
            factoryId:          eventRecordData.factoryId,
            tons:               eventRecordData.tons,
            area:               eventRecordData.area,
            color:              eventRecordData.color,
            details:            eventRecordData.details,};
        
        
        copyBrik(projectCopy);
      }

    if(loading){
        return (
            <Fragment>
                {(Object.keys(data).length !== 0) && <NavigationPanel offLineEndDate={offLineEndDate} saveOffLineEndDate = {saveOffLineEndDate} period = {period} schedulerConfig = {config} setConfig={setConfig}/>}
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "500px", marginBottom: "500px"}}>
                    <CircularProgress color="primary" />
                </div>
            </Fragment>
        )
    }
     
     configFeatures.eventMenu.items.copyEvent.onItem = () => {handlerOnCopy();}

    //  console.log({topEvents, bottomEvents});


    return (
        <Fragment>
            <NavigationPanel offLineEndDate={offLineEndDate} saveOffLineEndDate = {saveOffLineEndDate}  period={period} schedulerConfig = {config} setConfig={setConfig}/>
            <BryntumScheduler
                 {...Object.assign({}, config, configFeatures) }
                // {...config}
                listeners={{
                beforeEventEdit: (source: any) => {
                    source.eventRecord.resourceId = source.resourceRecord.id;
                    showEditor(source.eventRecord);
                    return false;
                    }
                }}
                ref={schedulerRef1}
                events={topEvents}
                resources={topResources}
                barMargin={3}
                onCopy={handlerOnCopy}
                onEventResizeEnd={handlerOnEventResizeEnd}
                onBeforeEventSave={handlerOnBeforeSave}
                onAfterEventSave={handlerOnAfterSave}
                onAfterEventDrop={handlerOnAfterEventDrop}
                onBeforeEventDelete={handlerOnAfterEventDelete}
                //onBeforeEventEditShow={beforeEventEditShow}
            /><div>
                {popupShown ? (
                    <Popup
                        text="Popup text"
                        closePopup={hideEditor}
                        eventRecord={eventRecord}
                        eventStore={eventStore}
                        resourceStore={resourceStore}
                    ></Popup>
                ) : null}
            </div>
            {schedulerRef1.current&&<BryntumScheduler
                                            ref={schedulerRef2} 
                                            resources={bottomResources}
                                            events={bottomEvents}
                                            {...config2}
                                            partner={schedulerRef1.current.schedulerInstance} />}  
                                                  </Fragment>
    );
};

export default App;
