// Core
import React, { useState } from "react";

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

export const NyBrikForm = () => {

  // State for Project and Arbejdsplads
  const [ projectName, setProjectName ] = useState('')

  // Start date
  const [ startDate, setStartDate ] = useState<Date | null>(new Date( (new Date()).getTime() - 1000 * 60 ));

  // End date
  const [ endDate, setEndDate ] = useState<Date | null>(new Date());

  // State for varighed toggler
  const [ isWorkWeekends, setIsWorkWeekends ] = useState(false)

  // State for Date period and Varighed
  const [ varighed, setVarighed ] = useState(lagInDays(startDate, endDate, isWorkWeekends));

  return (
    <List>
      <Region />
      <Project setProjectName={setProjectName} />
      <Arbejdsplads projectName={projectName} />
      <KalkuleBesk />
      <KundeNavn />
      <DatePeriod setVarighed={setVarighed} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} isWorkWeekends={isWorkWeekends} />
      <Varighed varighed={varighed} setVarighed={setVarighed} setEndDate={setEndDate} startDate={startDate} endDate={endDate} isWorkWeekends={isWorkWeekends} setIsWorkWeekends={setIsWorkWeekends} />
      <Status />
      <JobType />
      <Hold />
      <EnterpriseLeder />
      <Fabrik />
      <FabrikVare />
      <Ejendomme />
    </List>
  );
}