// Types
import { ItemType } from '../types';
// Helpers
import { getUserLoginData } from '../../../../helpers/getUserLoginData';

export const selectionItemsDetail = async ( setOptions: any, active: boolean, factoryId: string ) => {
  const selectionItemsDetail = process.env.REACT_APP_SELECTION_ITEM_DETAILS;

  const {login, password} = getUserLoginData();
  const encoded = window.btoa(`${login}:${password}`) 
  const response = await fetch(`${selectionItemsDetail}${factoryId}`, {
        method:  'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encoded}`,
        },
    });
  const projects: ItemType = await response.json();

  if (active) {
    setOptions(projects.root.items.item);
  }
};