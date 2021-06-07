// Helpers
import { getUserLoginData } from "../../../../helpers/getUserLoginData";

export const selectionProjectDetails = async ( setOptions: any, active: boolean, regionId: string ) => {
  const exportSelectionListProjectDetails = process.env.REACT_APP_SELECTION_PROJECT_DETAILS;

   const {login, password} = getUserLoginData();
    const encoded = window.btoa(`${login}:${password}`) 
  const response = await fetch(`${exportSelectionListProjectDetails}${regionId}`, {
        method:  'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encoded}`,
        },
    });

        
  const projects: any = await response.json();

  if (active) {
    setOptions(projects.root.projectsList.projectNo);
  }
};