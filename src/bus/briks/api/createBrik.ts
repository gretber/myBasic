// Store
import { store } from '../../../@init';

// Actions
import { togglerCreatorAction } from '../../client';
import { setNuBrikAction } from '../actions';

// Types
import { CreateBrikType } from './types';

export const createBrik: CreateBrikType = async (newBrik) => {

  // Clean request data
  const bodyNewBrik = { ...newBrik }
  delete bodyNewBrik.eventColor

  const body = {
    root: {
      projects: {
        project: [
          bodyNewBrik
        ]
      }
    }
  };

  console.log("body of request", body)

  const createBrikUrl = process.env.REACT_APP_CREATE_PROJECT;
  store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: true }));
  try {
    const encoded = window.btoa('lei-lmk:AAABBB')

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

      store.dispatch(setNuBrikAction(newBrik));

  } catch (error) {
      console.log(error);
  } finally {
      store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: false }));
  }
};