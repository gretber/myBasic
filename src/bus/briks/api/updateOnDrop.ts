// Types
import { Project } from '../dataTypes';

// Store
import { store } from '../../../@init';

// Actions
import {updateProjectAction} from '../actions';

// Helpers
import { getUserLoginData } from '../../../helpers/getUserLoginData';

export const updateDragAndDropProject = async (body: Project) => {

  const id = body.id

  const prepareBody = {
    root: {
      projects: {
        project: [
          body
        ]
      }
    }
  }

  const updateProjectURL = process.env.REACT_APP_UPDATE_PROJECT;

  try {
     const {login, password} = getUserLoginData();
    const encoded = window.btoa(`${login}:${password}`) 

    const response = await fetch(`${updateProjectURL}${id}`, {
    method:  'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encoded}`,
        },

        body: JSON.stringify(prepareBody),
    });

    if (response.status !== 200) {
      throw new Error('update drag and drop project failed');
    }
    // store.dispatch(updateProjectAction(body));
    

  } catch (error) {
    console.log(error);
  } 
}