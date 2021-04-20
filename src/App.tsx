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
    BryntumDemoHeader,
    BryntumThemeCombo,
    BryntumScheduler,
    BryntumNumberField,
    BryntumButton
} from '@bryntum/scheduler-react';
import { Toast, EventModel } from '@bryntum/scheduler/scheduler.umd.js';
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
import { Fullscreen } from '@bryntum/scheduler';

const App: FunctionComponent = () => {

    // Ref
    const schedulerRef = useRef<typeof BryntumScheduler | null>(null);

    // Init state
    const [events, setEvents] = useState<Array<Project> | []>([]);
    const [resources, setResources] = useState<Array<Team> | []>([]);
    const [timeRanges, setTimeRanges] = useState([]);

    const [barMargin, setBarMargin] = useState(3);
    const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);

    // Get data
    const { data, loading } = useDataQuery()

    useEffect(()=> {
        if("root" in data){
            const transformedData = data.root.projects.project.map((item) => {
                item["resourceId"] = item["teamId"];
                item["eventColor"] = item["color"];
                item.eventColor = `#${item.eventColor}`;
                return { ...item, startDate: formatDate(swap(item.startDate))!, endDate: formatDate(swap(item.endDate))! }
            })
            const teams = data.root.teams.team
            setResources(teams);
            setEvents(transformedData);
        }
    }, [loading])

    // event selection change handler
    const onEventSelectionChange = useCallback(({ selected }: { selected: EventModel[] }) => {
        console.log(selected[0])
        setSelectedEvent(selected.length ? selected[0] : null);
    }, []);

    // add event handler
    const addEvent = useCallback(() => {
        const scheduler = schedulerRef.current.instance;
        const startDate = new Date(scheduler.startDate.getTime());
        const endDate = new Date(startDate.getTime());
        const resource = scheduler.resourceStore.first;

        if (!resource) {
            Toast.show('There is no resource available');
            return;
        }

        endDate.setHours(endDate.getHours() + 2);

        scheduler.eventStore.add({
            resourceId: resource.id,
            startDate: startDate,
            endDate: endDate,
            name: 'New task',
            eventType: 'Meeting'
        });
    }, []);

    // remove event handler
    const removeEvent = useCallback(() => {
        selectedEvent?.remove();
        setSelectedEvent(null);
    }, [selectedEvent]);

    // Full screen
    // const fullScreenHandler = () => {
    //     const scheduler = schedulerRef.current.instance;
    //     console.log(Fullscreen.isFullscreen)
    //     Fullscreen.request(scheduler)
    //     console.log(Fullscreen.isFullscreen)

    // }

    if(loading){
        return <div>loading......</div>
    }

    return (
        <Fragment>
            <NavigationPanel />
            {/* <BryntumDemoHeader
                title="Brik"
                href="/"
                children={<BryntumThemeCombo />}
            />
            <div className="demo-toolbar align-right">
                {(() => {
                    return selectedEvent ? (
                        <div className="selected-event">
                            <label>Selected event: </label>
                            <span>{selectedEvent.name}</span>
                        </div>
                    ) : (
                        ''
                    );
                })()}

                <BryntumNumberField
                    label="Bar margin"
                    min={0}
                    max={15}
                    value={barMargin}
                    onChange={({ value }: { value: number }) => setBarMargin(value)}
                />
                <BryntumButton icon="b-fa-plus" cls="b-green" onClick={addEvent} />
                <BryntumButton
                    icon="b-fa-trash"
                    cls="b-red"
                    onClick={removeEvent}
                    disabled={!selectedEvent}
                />
            </div> */}
            <BryntumScheduler
                ref={schedulerRef}
                {...schedulerConfig}
                events={events}
                resources={resources}
                timeRanges={timeRanges}
                barMargin={barMargin}
                onEventSelectionChange={onEventSelectionChange}
            />
        </Fragment>
    );
};

export default App;
