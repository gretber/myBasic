// Types
import { ProjectType } from '../types';

export const selectionProjects = async (setOptions: any, active: boolean) => {
  const exportSelectionListProject = process.env.REACT_APP_SELECTION_PROJECT;

  const encoded = window.btoa('lei-lmk:AAABBB')
  const response = await fetch(`${exportSelectionListProject}`, {
        method:  'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encoded}`,
        },
    });

        
  const projects: ProjectType = await response.json();

  if (active) {
    setOptions(projects.root.projectsList.projectNo);
  }
};