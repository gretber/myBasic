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
} from '@bryntum/scheduler-react'
import { Toast, EventModel } from '@bryntum/scheduler/scheduler.umd.js'
import axios from 'axios';
import { schedulerConfig } from './AppConfig'
import './App.scss';

import { NavigationPanel } from './containers/NavigationPanel'

// React Query
import { useBriksQuery } from './bus/briks'

// Helpers
import { formatDate } from './helpers/formatDate'
import { swap } from './helpers/swapElArr'

const App: FunctionComponent = () => {
    const schedulerRef = useRef<typeof BryntumScheduler | null>(null);

    const [events, setEvents] = useState([]);
    const [resources, setResources] = useState([]);
    const [timeRanges, setTimeRanges] = useState([]);

    const [barMargin, setBarMargin] = useState(5);
    const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);

        // const {isFetching, data} = useBriksQuery()
        // !isFetching?console.log(data):console.log('fetching...')

    // load and set data
    useEffect(function () {
        axios
            .get('data/data.json')
            .then(response => {
                const { data }: any = response;
                const transformedData = data.root.projects.project.map((item: any) => {
                    item["resourceId"] = item["leaderId"];
                    item["eventColor"] = item["color"];
                    item.eventColor = `#${item.eventColor}`;
                    return { ...item, startDate: formatDate(swap(item.startDate)), endDate: formatDate(swap(item.endDate)) }
                })

                setResources(data.root.leaders.leader);
                setEvents(transformedData);
                //setTimeRanges(data.timeRanges.rows);
            })
            .catch(error => {
                Toast.show(String(error));
                console.warn(error);
            });
    }, []);

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
