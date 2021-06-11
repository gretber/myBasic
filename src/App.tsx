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
import { sortSelectedRegions } from './helpers/sortSelectedRegions';
import { sortSelectedFabriks } from './helpers/sortSelectedFabriks';
import { lagInDays } from './helpers/lagInDays';
import { subDays } from './helpers/subDays';
import { transformFactoriesEvents } from './helpers/transformFactoriesEvents';

// API
import { updateProject } from './API/onSaveAPI/updateProject';
import { deleteProject } from './API/onDeleteAPI/deleteProject';
import { dropProject } from './API/onDropAPI/dropProject';
import { onResizeProject } from './API/onResize/onResizeProject';
import {copyBrik} from './bus/briks/api/copyBrik';

// Moment
import moment from 'moment';

// Types
import { Factory, Project, SelectionValue, SelectionType, Team } from './bus/briks/dataTypes';

import Popup from './elements/popup/Popup';
import { calculateWeekStartDate } from './helpers/calculateWeekStartDate';

// Styles
import { makeStyles } from '@material-ui/core';
import { resourceBySelectedRegions } from './helpers/resourceBySelectedRegions';

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

export const App = ({isAuthorized, setAuthorized, dragHandler}: {isAuthorized:boolean, setAuthorized: React.Dispatch<React.SetStateAction<boolean>>,  
dragHandler: any}) => {

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
                
                const {calculatedEndtDate, calculatedStartDate} = calculateWeekStartDate(startDate, endDate);
                newState.startDate = calculatedStartDate;
                newState.endDate = calculatedEndtDate;

                saveOffLineEndDate(config.endDate);

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
            const sortedFabriks = sortSelectedFabriks(transformedProjects, selectionFabriks) // Sorted projects by fabriks 
            const selectedFabriksCount = selectionFabriks.filter( item => item["-selected"] === true ) // Only selected 
            // console.log({selectedFabriksCount});

            if(selectedFabriksCount.length === 0){
                // console.log('selectedFabriksCount.length === 0');
                const allTeams: any = data.root.selections.selection[0].values.value
                console.log({allTeams})
                // Sort by selected Teams
                const selectedTeams = allTeams.filter( (item: SelectionValue) => item['-selected'] === true ) // Filter by selected teams
                
                // Transform teams ( add id fields )
                const copySelectionTeams = selectedTeams.map( (item: any) => {
                    return { ...item }
                })
                // console.log({copySelectionTeams})
                copySelectionTeams.map( (item: any) =>  {
                    item["id"] = item["-id"]
                })

                // Sort Regions
                const selectionRegion = data.root.selections.selection[1].values.value // All Regions
                const sortedByRegions = sortSelectedRegions(transformedProjects, selectionRegion) // Projects containing selected regions
                console.log({sortedByRegions})
                const factories = data.root.factories.factory.map( (item: Factory) => {
                    return {...item} 
                })

                const resourseFactoryId = sortedByRegions.map((a: any) => ({...a})); // Copy projects containing selected regions
                const resourseFACTORY = resourceBySelectedRegions(sortedByRegions, allTeams)
                console.log({resourseFACTORY})
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

                setBottomResources(activeFactories);
                setBottomEvents(dropEmptyTons);

                setTopResources(copySelectionTeams);
                setTopEvents(sortedByRegions);

            } else {
                console.log('selectedFabriksCount.length !== 0');
                type ISelectionType = 'team' | 'region' | 'factory';

                const getEntitiesSelectionByType= (data: any, type: ISelectionType) => {
                    return data.root.selections.selection
                        .find((selection: {type: SelectionType, values: any}) => selection.type === type)
                        ?.values
                        ?.value
                        ?.filter((entity: any) => entity['-selected'] === true)
                        ?.map((selectedEntity: any) => selectedEntity['-id']);
                }


                const selectedFactoriesIds = getEntitiesSelectionByType(data, 'factory');
                console.log({selectedFactoriesIds});
             
                const selectedProjects = data.root.projects.project.filter((project: Project) => selectedFactoriesIds?.includes(project.factoryId));
                const selectedTeams = data.root.teams.team.filter((team) => selectedProjects.find((project) => project.teamId === team.id));
               
                // @ts-ignore
                setTopEvents(selectedProjects);
                // @ts-ignore
                setTopResources(selectedTeams);
               
                // Sort Regions
                const selectionRegion = data.root.selections.selection[1].values.value
                const sortedByRegions = sortSelectedRegions(sortedFabriks, selectionRegion)

                const copySortedByRegions = sortedByRegions.map ((item: any)=> ({...item, resourceId: item["factoryId"]})) // Copy sortedByRegions and add id field resourceId
                const eventsWithCountedTons = transformFactoriesEvents(copySortedByRegions)
                const dropEmptyTons = eventsWithCountedTons.filter( (item: any) => item.tons !== 0 )


                const copySelectedFabriks = selectedFabriksCount.map( (item: any) => ({...item, id: item["-id"]}) ) // Copy selected fabriks and add id field id
                const activeFactories: any = []
                copySelectedFabriks.forEach( forEachItem => {
                    const resultItem = eventsWithCountedTons.find( (findItem: any) => forEachItem.id === findItem.resourceId)
                    if (resultItem) {
                        activeFactories.push(forEachItem)
                    }
                })
           
                // Sorted Teams
                const selectionTeams = data.root.selections.selection[0].values.value.filter( (item: any) => item['-selected'] === true )
                
                // Transform teams
                const copySelectionTeams = [...selectionTeams];
                copySelectionTeams.map( (item: any) =>  {
                    item["resourceId"] = item["-id"]
                    item["id"] = item["-id"]
                })


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
                
                setBottomResources(activeFactories)
                setBottomEvents(dropEmptyTons)

                setTopEvents(events);
                setTopResources(sortTeams);
                
            }
        }

    }, [data, loading, isAuthorized])

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
                {(Object.keys(data).length !== 0) && <NavigationPanel setAuthorized={setAuthorized} offLineEndDate={offLineEndDate} period = {period} schedulerConfig = {config} />}
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
            <NavigationPanel setAuthorized={setAuthorized} offLineEndDate={offLineEndDate} period={period} schedulerConfig = {config} />
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
