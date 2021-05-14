// Core
import React, { useEffect, useState } from "react";

// Material
import List from "@material-ui/core/List";

// Elements
import { Region } from "../../elements/NyBrikForm/Region";
import { Project } from "../../elements/NyBrikForm/Project";
import { Arbejdsplads } from "../../elements/NyBrikForm/Arbejdsplads";
import { KalkuleBesk } from "../../elements/NyBrikForm/KalkuleBesk";
import { KundeNavn } from "../../elements/NyBrikForm/KundeNavn";
import { DatePeriod } from "../../elements/NyBrikForm/DatePeriod";
import { Varighed } from "../../elements/NyBrikForm/Varighed";
import { Status } from "../../elements/NyBrikForm/Status";
import { JobType } from "../../elements/NyBrikForm/JobType";
import { Hold } from "../../elements/NyBrikForm/Hold";
import { EnterpriseLeder } from "../../elements/NyBrikForm/EnterpriseLeder";
import { Fabrik } from "../../elements/NyBrikForm/Fabrik";
import { FabrikVare } from "../../elements/NyBrikForm/FabrikVare";
import { Ejendomme } from "../../elements/NyBrikForm/Ejendomme";

// Helpers
import { lagInDays } from '../../helpers/lagInDays';
import { convertDate } from '../../helpers/convertDate';

export const NyBrikForm = ({ setNewBrik }: any) => {

  // State for region
  const [ regionId, setRegionId ] = useState('');

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, regionId}
    })
  },[regionId])

  // State for Project and Arbejdsplads
  const [ projectName, setProjectName ] = useState("")

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, name: projectName}
    })
  },[projectName])

  const [ projectNo, setProjectNo ] = useState(null)

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, projectNo}
    })
  },[projectNo])

  // State for Kalkule Besk
  const [ name2, setName2 ] = useState(null)
  
  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, name2}
    })
  },[name2])

  // State for kunde navn (customer)
  const [ customerName, setCustomerName ] = useState(null);

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, customerName}
    })
  },[customerName])

  // State for customerID
  const [ customerId, setCustomerId ] = useState(null)

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, customerId}
    })
  },[customerId])

  // Start date
  const [ startDate, setStartDate ] = useState<Date | null>(new Date( (new Date()).getTime() - 1000 * 60 ));

  useEffect(()=>{
    const date = convertDate(startDate)
    setNewBrik((prevState: any)=> {
      return {...prevState, startDate: date}
    })
  },[startDate])

  // End date
  const [ endDate, setEndDate ] = useState<Date | null>(new Date());

  useEffect(()=>{
    const date = convertDate(endDate)
    setNewBrik((prevState: any)=> {
      return {...prevState, endDate: date}
    })
  },[endDate])

  // State fo Varighed toggler work weekends
  const [ isWorkWeekends, setIsWorkWeekends ] = useState(false)

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, weekendWork: isWorkWeekends}
    })
  },[isWorkWeekends])

  // State for Date period and Varighed
  const [ varighed, setVarighed ] = useState(lagInDays(startDate, endDate, isWorkWeekends));

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, duration: varighed}
    })
  },[varighed])

  // State for job type
  const [jobType, setJobType] = useState("");

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, jobType}
    })
  },[jobType])

  // State for teams (HOLD)
  const [ teamId, setTeamId ] = useState('')

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, teamId}
    })
  },[teamId])

  // State for enterprise Leder
  const [ leaderId, setLeaderId ] = useState('')

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, leaderId}
    })
  },[leaderId])

  // State for fabrik (factory)
  const [factoryItemName, setFactoryItemName] = useState('')
  const [factoryItemId, setFactoryItemId] = useState('')
  const [factoryId, setFactoryId] = useState('')

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, factoryId}
    })
  },[factoryId])

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, factoryItemName}
    })
  },[factoryItemName])

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, factoryItemId}
    })
  },[factoryItemId])

  // State for status and clips

  const [status, setStatus] = React.useState('0');
  const [state, setState] = React.useState('2');

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, status}
    })
  },[status])

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, state}
    })
  },[state])

  // State for Ejendomme (area, tons)
  const [area, setArea] = useState(0)
  const [tons, setTons] = useState(0)

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, area}
    })
  },[area])

  useEffect(()=>{
    setNewBrik((prevState: any)=> {
      return {...prevState, tons}
    })
  },[tons])

  return (
    <List>
      <Region setRegionId={setRegionId}
              projectName={projectName}
              regionId={regionId} />

      <Project  setFactoryId={setFactoryId}
                setProjectNo={setProjectNo}
                setProjectName={setProjectName}
                regionId={regionId}
                setRegionId={setRegionId}
                setCustomerName={setCustomerName}
                setCustomerId={setCustomerId} />

      <Arbejdsplads projectName={projectName}
                    setProjectName={setProjectName} />

      <KalkuleBesk setName2={setName2} />

      <KundeNavn  setCustomerName={setCustomerName}
                  projectName={projectName}
                  customerName={customerName} />

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

      <JobType jobType={jobType} setJobType={setJobType} />

      <Hold setTeamId={setTeamId}/>

      <EnterpriseLeder setLeaderId={setLeaderId} />

      <Fabrik setFactoryId={setFactoryId} factoryId={factoryId} />

      <FabrikVare factoryId={factoryId}
                  setFactoryItemName={setFactoryItemName}
                  setFactoryItemId={setFactoryItemId} />

      <Ejendomme area={area} setArea={setArea} tons={tons} setTons={setTons} />
    </List>
  );
}