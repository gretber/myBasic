/**
 * Application
 */

// Core
import React, {
    Fragment,
    useEffect,
    useState,
    useRef,
    useCallback,
    } from 'react'
import {
    BryntumScheduler,
} from '@bryntum/scheduler-react';


// Config
import { schedulerConfig, eventRecordData, configFeatures } from './AppConfig';
import { schedulerConfig2 } from './AppConfig2';
import './App.scss';

// Containers
import { NavigationPanel } from './containers/NavigationPanel';

// Resize
// @ts-ignore: Unreachable code error
import ResizePanel from "react-resize-panel";

// Components
// import Popup from './components/popup/popup';

// Material
import CircularProgress from '@material-ui/core/CircularProgress';

// Data
import { useDataQuery } from './bus/briks';

// Helpers
import { formatDate } from './helpers/formatDate';
import { swap } from './helpers/swapElArr';
import { lagInDays } from './helpers/lagInDays';
import { subDays } from './helpers/subDays';
import { transformFactoriesEvents } from './helpers/transformFactoriesEvents';
import { calculateWeekStartDate } from './helpers/calculateWeekStartDate';
import { sortByJobTypes } from './helpers/sortByJobTypes';
import { resourceOnlyExistsTeams } from './helpers/resourceOnlyExistsTeams';
import { bottomResourceOnlyExistsFabrics } from './helpers/bottomResourceOnlyExistsFabrics';


// API
import { updateProject } from './API/onSaveAPI/updateProject';
import { deleteProject } from './API/onDeleteAPI/deleteProject';
import { dropProject } from './API/onDropAPI/dropProject';
import { onResizeProject } from './API/onResize/onResizeProject';
import {copyBrik} from './bus/briks/api/copyBrik';
import { fetchData } from './bus/briks/api';

// Moment
import moment from 'moment';

// Types
import { Factory, Project, SelectionValue, SelectionType, Team } from './bus/briks/dataTypes';

import Popup from './elements/popup/Popup';

// Styles
import { makeStyles } from '@material-ui/core';



const useStyle = makeStyles({
    resizeWrapper : {
    minHeight: '40%',
   
    },
   
    resizePanel :{
        backgroundColor: '#ff6207',
        height: 1,
        width: '100%',
    },
    schedulerWrapper: {
        minHeight: 200,
    },

}) 

export const App = ({isAuthorized, setAuthorized}: {isAuthorized:boolean, setAuthorized: React.Dispatch<React.SetStateAction<boolean>>}) => {

    // Ref
    const schedulerRef1 = useRef<typeof BryntumScheduler | null>(null);
    const schedulerRef2 = useRef<typeof BryntumScheduler | null>(null);

    // Styles
    const classes = useStyle();

    // Init state
    const [topEvents, setTopEvents] = useState<Array<Project> | []>([]);
    const [topResources, setTopResources] = useState<Array<SelectionValue> | []>([]);

    const [bottomEvents, setBottomEvents] = useState<any>([]);
    const [bottomResources, setBottomResources] = useState<any>([]);

    const [config, setConfig] = useState({...schedulerConfig});
    const [config2] = useState({...schedulerConfig2});
    const [period, setPeriod] = useState('');

    const [popupShown, showPopup] = useState(false);
    const [eventRecord, setEventRecord] = useState(null);
    const [eventStore, setEventStore] = useState(null);
    const [resourceStore, setResourceStore] = useState(null);

    // JobTypes
    
    const [jobTypes, setJobTypes] = useState({'Fræs': true, 'Striber': true, 'Opretning': true});

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
        //setEventRecord(null);
        showPopup(false);
    }, []);


    // Get data
    const { data, loading } = useDataQuery();
    //console.log('\n\n', {data}, '\n\n');

    useEffect(()=> {
        const updateInterval = setInterval(() => {fetchData();}, 300_000)
        if("root" in data){

            // Set Config
            setConfig( (prevState: any) => {
                const newState = { ...prevState }
                const startDate = moment(data.root.view.startDate, "DD/MM/YYYY").toDate()
                const endDate = moment(data.root.view.endDate, "DD/MM/YYYY").toDate()
                
                const {calculatedEndtDate, calculatedStartDate} = calculateWeekStartDate(startDate, endDate);
                newState.startDate = calculatedStartDate;
                newState.endDate = calculatedEndtDate;

                if(data.root.view.timeframe === 'week')
                {
                    setPeriod('Uge')
                    newState.viewPreset = 'myDayAndWeekPreset';
                }
                else if(data.root.view.timeframe === '2weeks')
                {
                    setPeriod('To uger')
                    newState.viewPreset = 'myDayAndWeekPreset';
                }
                else if(data.root.view.timeframe === 'month')
                {
                    setPeriod('Måned');
                    newState.viewPreset = 'myDayAndMonthPreset';
                }
                else if(data.root.view.timeframe === '24weeks'){
                    setPeriod('24 uger');
                    newState.viewPreset = 'my24WeeksPreset';
                }
                else
                {
                    setPeriod(data.root.view.timeframe)
                    newState.viewPreset = 'my24WeeksPreset';
                }
               
                return newState
            })

            // Transform data
            const transformedProjects = data.root.projects.project.map((item) => {
                item["resourceId"] = item["teamId"]; // add connection field between resource and events

                if(!("eventColor" in item)){
                    item["eventColor"] = item["color"];
                    item.eventColor = `#${item.eventColor}`;
                }
                return { ...item, startDate: formatDate(swap(item.startDate))!, endDate: formatDate(swap(item.endDate))! }
            })

            // Sort Fabrik
            const selectionFabriks = data.root.selections.selection[2].values.value // All fabriks
            const selectedFabriksCount = selectionFabriks.filter( item => item["-selected"] === true ) // Only selected fabriks

            if(selectedFabriksCount.length === 0){
                const allTeams: any = data.root.selections.selection[0].values.value
               
                const factories = data.root.factories.factory.map( (item: Factory) => {
                    return {...item} 
                })

                const resourseFactoryId = transformedProjects.map((a: any) => ({...a})); // Copy projects containing selected regions

                const resource = resourceOnlyExistsTeams(transformedProjects, allTeams)
                
                resourseFactoryId.map((item: any)=> {
                    item["resourceId"] = item["factoryId"];  // Resource 
                })

                const transformFactories = transformFactoriesEvents(sortByJobTypes(resourseFactoryId, jobTypes));
                const dropEmptyTons = transformFactories.filter( (item: any) => item.tons !== 0 )
                const bottomResource = bottomResourceOnlyExistsFabrics(dropEmptyTons, factories)

                setBottomResources(bottomResource);
                setBottomEvents(dropEmptyTons);
                
                const sortedByJobTypes = sortByJobTypes(transformedProjects, jobTypes);
                setTopResources(resource);
                setTopEvents(sortedByJobTypes);

            } else {
                console.log('selectedFabriksCount.length !== 0');
                // Top resources and events
                const copyProjectsSelectedByFabric = transformedProjects.map((a: any) => ({...a})); // Copy projects containing selected fabric
                 const allTeams: any = data.root.selections.selection[0].values.value
                 const resource = resourceOnlyExistsTeams(copyProjectsSelectedByFabric, allTeams)
                console.log({copyProjectsSelectedByFabric})
                // *********

                // Bottom resources and events
                const copyProjectsWithResourceIdFactoryId = copyProjectsSelectedByFabric.map((item: any)=> {
                    return {...item, resourceId: item.factoryId}

                })
                const transformFactories = transformFactoriesEvents(sortByJobTypes(copyProjectsWithResourceIdFactoryId, jobTypes));
                console.log({transformFactories})
                const dropEmptyTons = transformFactories.filter( (item: any) => item.tons !== 0 )
                console.log({dropEmptyTons})
                const factories = data.root.factories.factory.map( (item: Factory) => {
                    return {...item} 
                })
                const bottomResource = bottomResourceOnlyExistsFabrics(dropEmptyTons, factories)
                // *********

                const sortedByJobTypes = sortByJobTypes(copyProjectsSelectedByFabric, jobTypes);
                setTopEvents(sortedByJobTypes);
                setTopResources(resource);

                setBottomResources(bottomResource)
                setBottomEvents(dropEmptyTons)              
            }
        }
        return () => {clearInterval(updateInterval);}
    }, [data, loading, isAuthorized, jobTypes])

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
           
        updateProject(body)
        event.context.finalize()
    },[])

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
            console.log('handlerOnCopy');
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
                {(Object.keys(data).length !== 0) && <NavigationPanel jobTypes={jobTypes} setJobTypes={setJobTypes} setAuthorized={setAuthorized} period = {period} schedulerConfig = {config} />}
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "500px", marginBottom: "500px"}}>
                    <CircularProgress color="primary" />
                </div>
            </Fragment>
        )
    }
     
     
    if(localStorage.getItem('schedulerUserType') !== 'edit')
        {
            configFeatures.eventDragCreate = false;
            configFeatures.eventDragSelect = false;
            configFeatures.eventResize.disabled = true; 
            configFeatures.eventDrag.disabled = true;
            configFeatures.eventMenu.items.copyEvent = false;
            configFeatures.eventMenu.items.deleteEvent = false;
            configFeatures.eventEdit.disabled = true;
        }
        else
        {   
            configFeatures.eventDragCreate = false;
            configFeatures.eventDragSelect = true;
            configFeatures.eventResize.disabled = false ; 
            configFeatures.eventDrag.disabled = false;
            configFeatures.eventEdit.disabled = false;
            delete configFeatures.eventMenu.items.deleteEvent;
            configFeatures.eventMenu.items.copyEvent =
                {
                    weight: 0,
                    text: 'Duplicate',
                    style: {
                        paddingRight: "40px",
                        textAlign: "center"
                    },
                    onItem : () => {handlerOnCopy();}
                };
            configFeatures.eventMenu.items.deleteEvent = 
                {
                    weight: 1,
                    text: 'Delete',
                    icon: '',
                    style: {
                        paddingRight: "40px",
                        textAlign: "center"
                    },
                }
        }
return (
        <>
            <NavigationPanel setAuthorized={setAuthorized} jobTypes={jobTypes} setJobTypes={setJobTypes} period={period} schedulerConfig = {config} />
            <BryntumScheduler
                 {...Object.assign({}, config, configFeatures) }
                // {...config}
                listeners={{
                ...config.listeners,
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
                onAfterEventDrop={handlerOnAfterEventDrop}
                onBeforeEventDelete={handlerOnAfterEventDelete}
                
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
            {schedulerRef1.current&&    
            <ResizePanel style={{height: '40%'}} direction="n" handleClass={classes.resizePanel}><BryntumScheduler
                                            ref={schedulerRef2} 
                                            resources={bottomResources}
                                            events={bottomEvents}
                                            {...config2}
                                            partner={schedulerRef1.current.schedulerInstance} />
                                                         </ResizePanel> }  
                                                  </>
    );
};

export default App;
