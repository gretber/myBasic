// Store
import { store } from '../../../@init';

// Actions
import { togglerCreatorAction } from '../../client';
import { setBriksAction, setNonScheduledBriksAction } from '../actions';

// Types
import { FetchNonScheduledBriks } from './types';
import { Data } from '../types';

// Hellpers
import { getUserLoginData } from '../../../helpers/getUserLoginData';

const nonScheduledBriksUrl = process.env.REACT_APP_NON_SCHEDULED_BRIK_URL;

export const fetchNonScheduledBriks: FetchNonScheduledBriks = async () => {
  const {login, password} = getUserLoginData();
    
    store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: true }));
    console.log('login', login)
    const encoded = window.btoa(`${login}:${password}`)
    
    try {
        const response = await fetch(`${nonScheduledBriksUrl}`, {
            method:  'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encoded}`,
            },
        });

        if (response.status !== 200) {
            throw new Error('Data fetch failed');
        }
        // console.log(await response.text())
        const data: Data = await response.json();
        
        if('root' in data)
        {
        store.dispatch(setNonScheduledBriksAction(data.root.projects.project));
        }
               
    } catch (error) {
        console.log(error);
           } finally {
        store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: false }));
    }
    
};
