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

export const NyBrikForm = () => {
  // State for Project and Arbejdsplads
  const [ projectName, setProjectName ] = useState('')

  return (
    <List>
      <Region />
      <Project setProjectName={setProjectName} />
      <Arbejdsplads projectName={projectName} />
      <KalkuleBesk />
      <KundeNavn />
      <DatePeriod />
      <Varighed />
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