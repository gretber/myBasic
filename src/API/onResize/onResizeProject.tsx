// Types
import { Project } from '../../bus/briks/dataTypes';

// Store
import { store } from '../../@init';

// Actions
import { togglerCreatorAction } from '../../bus/client';
import {updateProjectAction} from '../../bus/briks/actions';

// API
import { fetchData } from '../../bus/briks/api/fetchData';

// Helpers
import { getUserLoginData } from '../../helpers/getUserLoginData';

export const onResizeProject = async (body: Project) => {
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

  //store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: true }));  
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
      throw new Error('Todo create failed');
    }

    store.dispatch(updateProjectAction(body));
    //fetchData()

  } catch (error) {
    console.log(error);
  } finally {
    //store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: false }));
  }

}