// Types
import { Project } from '../../bus/briks/dataTypes';

// Store
import { store } from '../../@init';

// Actions
import { togglerCreatorAction } from '../../bus/client';
import {deleteProjectAction} from '../../bus/briks/actions';

// API
import { fetchData } from '../../bus/briks/api/fetchData'

export const deleteProject = async (id: string) => {
console.log('delete project api');
  const body = {
    root: {
      projects: {
        project: [
          {
            id: id,
            state: '4'
          }
        ]
      }
    }
  }

  const updateProjectURL = process.env.REACT_APP_UPDATE_PROJECT;

  //store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: true }));  
  try {
    const encoded = window.btoa('lei-lmk:AAABBB')

    const response = await fetch(`${updateProjectURL}${id}`, {
    method:  'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encoded}`,
        },

        body: JSON.stringify(body),
    });
    
    if (response.status !== 200) {
      throw new Error('Todo create failed');
    }
    store.dispatch(deleteProjectAction(id));
    //fetchData()

  } catch (error) {
    console.log(error);
  } finally {
    //store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: false }));
  }

}