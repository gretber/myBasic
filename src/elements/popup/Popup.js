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

// API
import { updateProject } from '../../API/onSaveAPI/updateProject'

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

    useEffect(()=>{
        console.log(newBrik)
    },[newBrik])
    // State for region
    const [ regionId, setRegionId ] = useState(dataState.regionId);

    // Set id 
    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, id: dataState.id}
        })
    },[])

    // State for region
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
    const [ teamId, setTeamId ] = useState(dataState.teamId)

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, teamId}
        })
    },[teamId])

    // State for enterprise Leder
    const [ leaderId, setLeaderId ] = useState(dataState.leaderId)

    useEffect(()=>{
        setNewBrik((prevState)=> {
        return {...prevState, leaderId}
        })
    },[leaderId])

    // State for fabrik (factory)
    const [factoryItemName, setFactoryItemName] = useState(dataState.factoryItemName)
    const [factoryItemId, setFactoryItemId] = useState(dataState.factoryItemId)
    const [factoryId, setFactoryId] = useState(dataState.factoryId)

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

    const [status, setStatus] = useState(dataState.status); // Clip on front
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
    const [area, setArea] = useState(dataState.area)
    const [tons, setTons] = useState(dataState.tons)

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

    const saveClickHandler = (newBrik) => {
        // const eventRecord = props.eventRecord;
        // eventRecord.set({ dataState });
        // if (!eventRecord.eventStore) {
        //     props.eventStore.add(eventRecord);
        // }

        updateProject(newBrik)

        props.closePopup();
    } // saveClickHandler

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
                                    setCustomerId={setCustomerId}
                                    customerId={customerId} />

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

                        <Hold teamId={teamId} setTeamId={setTeamId}/>

                        <EnterpriseLeder leaderId={leaderId} setLeaderId={setLeaderId} />

                        <Fabrik setFactoryId={setFactoryId} factoryId={factoryId} />

                        <FabrikVare factoryId={factoryId}
                                    setFactoryItemName={setFactoryItemName}
                                    setFactoryItemId={setFactoryItemId} />

                        <Ejendomme area={area} setArea={setArea} tons={tons} setTons={setTons} />
                    </List>
                </article>
                <footer style={{display: "flex", justifyContent: "flex-end", paddingRight: "24px"}}>
                    <Button variant="text" color="secondary" onClick={props.closePopup}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={()=>saveClickHandler(newBrik)}>Save</Button>
                </footer>
            </div>
        </div>
    );
}

export default Popup;

