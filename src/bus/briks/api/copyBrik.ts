// Store
import { store } from '../../../@init';

// Actions
import { togglerCreatorAction } from '../../client';
import { setNuBrikAction } from '../actions';

// Types
import { CreateBrikType } from './types';

export const copyBrik: CreateBrikType = async (newBrik) => {

  // Clean request data
  const bodyNewBrik = { ...newBrik }
    
  const body = {
    root: {
      projects: {
        project: [
          bodyNewBrik
        ]
      }
    }
  };
  console.log('body');
  console.log(body);
  const createBrikUrl = process.env.REACT_APP_CREATE_PROJECT;
  store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: true }));
  
    const login = localStorage.getItem('schedulerUserLogin');
    const password = localStorage.getItem('schedulerUserPassword')
  try {
     const encoded = window.btoa(`${login}:${password}`);

    const response = await fetch(`${createBrikUrl}`, {
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
      const data = await response.json();
      console.log('data');
      console.log(data);
      store.dispatch(setNuBrikAction(newBrik));

  } catch (error) {
      console.log(error);
  } finally {
      store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: false }));
  }
};