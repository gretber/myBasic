// Store
import { store } from '../../../@init';

// Actions
import { togglerCreatorAction } from '../../client';
import { updateSelectionAction } from '../actions';

// Types
import { UpdateSelection } from './types';

export const updateSelection: UpdateSelection = async (body) => {

  const updateSelectionUrl = process.env.REACT_APP_UPDATE_SELECTION;

  store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: true }));
  try {
  const encoded = window.btoa('lei-lmk:AAABBB')

  const response = await fetch(`${updateSelectionUrl}`, {
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


      store.dispatch(updateSelectionAction(body));

  } catch (error) {
      console.log(error);
  } finally {
      store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: false }));
  }
};