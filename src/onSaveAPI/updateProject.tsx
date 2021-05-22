// Types
import { Project } from '../bus/briks/dataTypes';

// Store
import { store } from '../@init';

// Actions
import { togglerCreatorAction } from '../bus/client';

export const updateProject = async (body: Project) => {
  const id = body.id
  const updateProjectURL = process.env.REACT_APP_UPDATE_PROJECT;

  store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: true }));
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

  } catch (error) {
    console.log(error);
  } finally {
    store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: false }));
  }

}