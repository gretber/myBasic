/**
 * Popup Component
 */
// Material

// Core
import React, { useState, useEffect } from 'react';

// Helpers
import { lagInDays } from '../../helpers/lagInDays';
import { convertDate } from '../../helpers/convertDate';
import { subDays } from '../../helpers/subDays';
import { idToJobType } from '../../helpers/idToJobType';

import List from "@material-ui/core/List";
import './Popup.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';

// Elements
import { Region } from '../NyBrikForm/Region';
import { Project } from '../NyBrikForm/Project';
import { Arbejdsplads } from '../NyBrikForm/Arbejdsplads';
import { KalkuleBesk } from '../NyBrikForm/KalkuleBesk';
import { KundeNavn } from '../NyBrikForm/KundeNavn';
import { DatePeriod } from '../NyBrikForm/DatePeriod';
import { Varighed } from '../NyBrikForm/Varighed';
import { Status } from '../NyBrikForm/Status';
import { JobType } from '../NyBrikForm/JobType';
import { Hold } from '../NyBrikForm/Hold';
import { EnterpriseLeder } from '../NyBrikForm/EnterpriseLeder';
import { Fabrik } from '../NyBrikForm/Fabrik';
import { FabrikVare } from '../NyBrikForm/FabrikVare';
import { Ejendomme } from '../NyBrikForm/Ejendomme';

const Popup = (props) => {

     const [ dataState, setDataState ] = useState({
        name      : '',
        eventType : 'Meeting',
        location  : '',
        ...props.eventRecord.data
    })

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
        eventColor: "#469e38",
        details: ""
    }

  const [ newBrik, setNewBrik ] = useState(initialBrik)


    console.log("newBrik", newBrik)


    // State for region
    const [ regionId, setRegionId ] = useState(dataState.regionId);

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, regionId}
        })
    },[regionId])

    // State for Project and Arbejdsplads
    const [ projectName, setProjectName ] = useState("")

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, name: projectName}
        })
    },[projectName])

    const [ projectNo, setProjectNo ] = useState(dataState.projectNo)

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, projectNo}
        })
    },[projectNo])

    // State for Kalkule Besk
    const [ name2, setName2 ] = useState(dataState.name2)
    
    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, name2}
        })
    },[name2])

    // State for kunde navn (customer)
    const [ customerName, setCustomerName ] = useState(dataState.customerName);

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, customerName}
        })
    },[customerName])

    // State for customerID
    const [ customerId, setCustomerId ] = useState(dataState.customerId)

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, customerId}
        })
    },[customerId])

    // Start date
    const [ startDate, setStartDate ] = useState(dataState.startDate);

    useEffect(()=>{
        const date = convertDate(startDate)
        setNewBrik((prevState)=> {
        return {...prevState, startDate: date}
        })
    },[startDate])

    // End date
    const [ endDate, setEndDate ] = useState(subDays(dataState.endDate,1));

    useEffect(()=>{
        const date = convertDate(endDate)
        setNewBrik((prevState)=> {
        return {...prevState, endDate: date}
        })
    },[endDate])

    // State fo Varighed toggler work weekends
    const [ isWorkWeekends, setIsWorkWeekends ] = useState(dataState.weekendWork)

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, weekendWork: isWorkWeekends}
        })
    },[isWorkWeekends])

    // State for Date period and Varighed
    const [ varighed, setVarighed ] = useState(lagInDays(startDate, endDate, true));

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, duration: lagInDays(startDate, endDate, true)}
        })
    },[varighed])

    // State for calculatedDuration
    
    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, calculatedDuration: varighed}
        })
    },[varighed])

    // State for job type
    const [jobTypeId, setJobTypeId] = useState(dataState.jobType);

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, jobType: jobTypeId}
        })
    },[jobTypeId])

    // State for teams (HOLD)
    const [ teamId, setTeamId ] = useState('')

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, teamId}
        })
    },[teamId])

    // State for enterprise Leder
    const [ leaderId, setLeaderId ] = useState('')

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, leaderId}
        })
    },[leaderId])

    // State for fabrik (factory)
    const [factoryItemName, setFactoryItemName] = useState('')
    const [factoryItemId, setFactoryItemId] = useState('')
    const [factoryId, setFactoryId] = useState('')

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, factoryId}
        })
    },[factoryId])

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, factoryItemName}
        })
    },[factoryItemName])

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, factoryItemId}
        })
    },[factoryItemId])

    // State for status and clips

    const [status, setStatus] = useState(dataState.status);              // Clip on front
    const [state, setState] = useState(dataState.state);    // Status on front

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, status}
        })
    },[status])

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, state}
        })
    },[state])

    // State for Ejendomme (area, tons)
    const [area, setArea] = useState(0)
    const [tons, setTons] = useState(0)

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, area}
        })
    },[area])

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, tons}
        })
    },[tons])

    const dataChangedHandler = ({ target }) => {
        setState(prevState => {
            return {
                ...prevState,
                [target.name] : target.value
            }
        })
    }

    const saveClickHandler = () => {
        const eventRecord = props.eventRecord;

        eventRecord.set({ dataState });

        if (!eventRecord.eventStore) {
            props.eventStore.add(eventRecord);
        }

        props.closePopup();
    } // saveClickHandler

    const startDateChangeHandler = (startDate) => {
        setState(prevState => {
            return {
                ...prevState,
                startDate : startDate
            }
        })
    }

    const endDateChangeHandler = (endDate) => {
        setState(prevState => {
            return {
                ...prevState,
                endDate : endDate
            }
        })
    }

    console.log({dataState})

    return (
        <div className='popup-mask'>
            <div className='popup'>
                <header>Edit Brik&nbsp;</header>
                <article>
                    <List>
                        <Region setRegionId={setRegionId}
                                projectName={projectName}
                                regionId={regionId} />

                        <Project    projectNo={projectNo}
                                    setFactoryId={setFactoryId}
                                    setProjectNo={setProjectNo}
                                    setProjectName={setProjectName}
                                    regionId={regionId}
                                    setRegionId={setRegionId}
                                    setCustomerName={setCustomerName}
                                    setCustomerId={setCustomerId}
                                    setName2={setName2} />

                        <Arbejdsplads projectName={projectName}
                                        setProjectName={setProjectName} />

                        <KalkuleBesk setName2={setName2} name2={name2} />

                        <KundeNavn  setCustomerName={setCustomerName}
                                    projectName={projectName}
                                    customerName={customerName}
                                    setCustomerId={setCustomerId} />

                        <DatePeriod setVarighed={setVarighed}
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    endDate={endDate}
                                    setEndDate={setEndDate}
                                    isWorkWeekends={isWorkWeekends} />

                        <Varighed varighed={varighed}
                                    setVarighed={setVarighed}
                                    setEndDate={setEndDate}
                                    startDate={startDate}
                                    endDate={endDate}
                                    isWorkWeekends={isWorkWeekends}
                                    setIsWorkWeekends={setIsWorkWeekends} />

                        <Status status={status}
                                setStatus={setStatus}
                                state={state}
                                setState={setState} />

                        <JobType jobTypeId={jobTypeId} setJobTypeId={setJobTypeId} />

                        <Hold setTeamId={setTeamId}/>

                        <EnterpriseLeder setLeaderId={setLeaderId} />

                        <Fabrik setFactoryId={setFactoryId} factoryId={factoryId} />

                        <FabrikVare factoryId={factoryId}
                                    setFactoryItemName={setFactoryItemName}
                                    setFactoryItemId={setFactoryItemId} />

                        <Ejendomme area={area} setArea={setArea} tons={tons} setTons={setTons} />
                    </List>
                </article>
                <footer style={{display: "flex", justifyContent: "flex-end", paddingRight: "24px"}}>
                    <Button variant="text" color="secondary" onClick={props.closePopup}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={saveClickHandler}>Save</Button>
                </footer>
            </div>
        </div>
    );
}

// class Popup extends React.Component {

//     /**
//      * Constructor (initializes state and binds handlers)
//      * @param {Object} props
//      */
//     constructor(props) {
//         super();

//         // create state with defaults overridden by eventRecord data
//         this.state = {
//             name      : '',
//             eventType : 'Meeting',
//             location  : '',
//             ...props.eventRecord.data
//         };

//         // shortcuts to handlers
//         this.dataChangedHandler = this.dataChangedHandler.bind(this);
//         this.saveClickHandler = this.saveClickHandler.bind(this);
//         this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
//         this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
//             console.log("POPUP STATE", this.state)
//     }

//     /**
//      * Sets the changed value to state
//      * @param {HTMLElement} target The input that changed
//      */
//     dataChangedHandler({ target }) {
//         this.setState(prevState => {
//             return {
//                 ...prevState,
//                 [target.name] : target.value
//             }
//         })
//     }

//     /**
//      * Updates state with startDate
//      * @param {Date} startDate
//      */
//     startDateChangeHandler(startDate) {
//         this.setState(prevState => {
//             return {
//                 ...prevState,
//                 startDate : startDate
//             }
//         })
//     }

//     /**
//      * Updates state with endDate
//      * @param {Date} endDate
//      */
//     endDateChangeHandler(endDate) {
//         this.setState(prevState => {
//             return {
//                 ...prevState,
//                 endDate : endDate
//             }
//         })
//     }
    
//     /**
//      * Saves the modified form data to the record being edited
//      */
//     saveClickHandler() {
//         const eventRecord = this.props.eventRecord;

//         eventRecord.set({ ...this.state });

//         if (!eventRecord.eventStore) {
//             this.props.eventStore.add(eventRecord);
//         }

//         this.props.closePopup();
//     } // saveClickHandler

//     /**
//      * @return The markup to render
//      */
//     render() {

//         const resourceItems = this.props.resourceStore.map(resource => (
//             <MenuItem key={resource.id} value={resource.id}>{resource.name}</MenuItem>
//         ));

//         console.log(resourceItems)

//         return (
//             <div className='popup-mask'>
//                 <div className='popup'>
//                     <header>Edit Brik&nbsp;</header>
//                     <article>
//                         <Region />
//                         <Project />
//                         <Arbejdsplads />
//                         <KalkuleBesk />
//                         <KundeNavn />
//                         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                             <KeyboardDateTimePicker
//                                 name="startDate"
//                                 label="Start"
//                                 ampm={false}
//                                 format="yyyy-MM-dd HH:mm"
//                                 style={{ width : '49%', marginRight : 5 }}
//                                 value={this.state.startDate}
//                                 onChange={this.startDateChangeHandler}
//                             ></KeyboardDateTimePicker>
//                             <KeyboardDateTimePicker
//                                 name="endDate"
//                                 label="End"
//                                 ampm={false}
//                                 format="yyyy-MM-dd HH:mm"
//                                 style={{ width : '49%', marginLeft : 5 }}
//                                 value={this.state.endDate}
//                                 onChange={this.endDateChangeHandler}
//                             ></KeyboardDateTimePicker>
//                         </MuiPickersUtilsProvider>
//                         <Varighed />
//                         <Status />
//                         <JobType />
//                         <Hold />
//                         <EnterpriseLeder />
//                         <Fabrik />
//                         <FabrikVare />
//                         <Ejendomme />
//                     </article>
//                     <footer>
//                         <Button variant="contained" color="secondary" onClick={this.props.closePopup}>Cancel</Button>
//                         <Button variant="contained" color="primary" onClick={this.saveClickHandler}>Save</Button>
//                     </footer>
//                 </div>
//             </div>
//         );
//     }
// }

export default Popup;

