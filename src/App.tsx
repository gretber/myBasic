/**
 * Application
 */
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
import { schedulerConfig } from './AppConfig';
import './App.scss';

import { NavigationPanel } from './containers/NavigationPanel';

// Data
import { useDataQuery } from './bus/briks';

// Helpers
import { formatDate } from './helpers/formatDate';
import { swap } from './helpers/swapElArr';

// Types
import { Team, Project } from './bus/briks/dataTypes';

// // Test
// import { store } from './@init';
// import { setNuBrikAction } from './bus/briks/actions';

//   const initialBrik = {
//     id: null,
//     regionId: "ØST",
//     leaderId: "SAK",
//     projectNo: null,
//     factoryItemName: "",
//     factoryItemId: "KST",
//     customerId: null,
//     customerName: null,
//     state: "",
//     status: "",
//     name: "",
//     name2: "",
//     startDate: "04/02/2021",
//     endDate: "14/02/2021",
//     duration: 11,
//     weekendWork: true,
//     jobType: "qwe",
//     teamId: "SPV",
//     factoryId: "",
//     tons: 0.0,
//     area: 0.0,
//     color: "",
//     details: ""
//   }

const App: FunctionComponent = () => {

    // Ref
    const schedulerRef = useRef<typeof BryntumScheduler | null>(null);

    // Init state
    const [events, setEvents] = useState<Array<Project> | []>([]);
    const [resources, setResources] = useState<Array<Team> | []>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);

    // Get data
    const { data, loading } = useDataQuery()

    useEffect(()=> {

        if("root" in data){
            const transformedData = data.root.projects.project.map((item) => {
                item["resourceId"] = item["teamId"];
                if(!("eventColor" in item)){
                    item["eventColor"] = item["color"];
                    item.eventColor = `#${item.eventColor}`;
                }
                return { ...item, startDate: formatDate(swap(item.startDate))!, endDate: formatDate(swap(item.endDate))! }
            })

            const teams = data.root.teams.team
            setResources(teams);
            setEvents(transformedData);
        }
        
    }, [loading, data])

    // event selection change handler
    const onEventSelectionChange = useCallback(({ selected }: { selected: EventModel[] }) => {
        console.log(selected[0])
        setSelectedEvent(selected.length ? selected[0] : null);
    }, []);

    const config = { ...schedulerConfig }

    const beforeEventEditShow = (event: any) => {

        // Current id
        const regionId = event.eventRecord.data.regionId;
        const leaderId = event.eventRecord.data.leaderId;
        const factoryId = event.eventRecord.data.factoryId;

        // Get fields
        const region = event.editor.widgetMap.region;
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

    

    if(loading){
        return <div>loading......</div>
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
                onEventSelectionChange={onEventSelectionChange}
                onBeforeEventEditShow={beforeEventEditShow}
            />
        </Fragment>
    );
};

export default App;
