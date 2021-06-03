// Store
import { store } from '../../../@init';

// Actions
import { togglerCreatorAction } from '../../client';
import { sortProjectsAction, updateSelectionAction } from '../actions';
import { fetchData } from './fetchData';

// Types
import { UpdateSelection } from './types';

export const updateSelection: UpdateSelection = async (body) => {

  // Copy team, region, factory
  const team = [...body.root.selections.selection[0].values.value]
  const region = [...body.root.selections.selection[1].values.value]
  const factory = [...body.root.selections.selection[2].values.value]

  // Clear team data
  const clearTeam: any = []
  team.map( (item: any) =>{
    const obj = { "-id": item["-id"], "-selected": item["-selected"], "name": item["name"] }
    clearTeam.push(obj)
  })


  // Create clear body
  const clearBody = {
    root: {
      selections: {
        selection: [
          {type: "team", values: { value: clearTeam }},
          {type: "region", values: { value: region }},
          {type: "factory", values: { value: factory }}
        ]
      }
    }
  }

  const syncBody = {
        selection: [
          {type: "team", values: { value: clearTeam }},
          {type: "region", values: { value: region }},
          {type: "factory", values: { value: factory }}
        ]
      };


  const updateSelectionUrl = process.env.REACT_APP_UPDATE_SELECTION;
  
 
    if( localStorage.getItem('schedulerUserType') === 'edit')
    {
    store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: true }));
  
    const login = localStorage.getItem('schedulerUserLogin');
    const password = localStorage.getItem('schedulerUserPassword')

  try {
    store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: true }));
    const encoded = window.btoa(`${'lei-lmk'}:${'AAABBB'}`)
    
    const response = await fetch(`${updateSelectionUrl}`, {
        method:  'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encoded}`,
        },

        body: JSON.stringify(clearBody),
    });

    if (response.status !== 200) {
      throw new Error('Todo create failed');
    }
    
      store.dispatch(updateSelectionAction(body));
      fetchData();
  } catch (error) {
      console.log(error);
  } finally {
    store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: false }));
  }
  }
  else 
  {
  store.dispatch(updateSelectionAction(body));
  store.dispatch(sortProjectsAction());
  }
};