// Store
import { store } from '../../../@init';

// Actions
import { togglerCreatorAction } from '../../client';
import { setBriksAction } from '../actions';

// Types
import { FetchData } from './types';
import { Data } from '../types';

const InitBriksUrl = process.env.REACT_APP_INIT_BRIK_URL;

export const fetchData: FetchData = async () => {
    const login = localStorage.getItem('schedulerUserLogin');
    const password = localStorage.getItem('schedulerUserPassword')
    store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: true }));
    const encoded = window.btoa(`${'lei-lmk'}:${'AAABBB'}`)
    if(localStorage.getItem('schedulerUserType') !== 'edit')
    {
        localStorage.setItem("schedulerUserType", "edit")
    }
    try {
        const response = await fetch(`${InitBriksUrl}`, {
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

        const data: Data = await response.json();

        store.dispatch(setBriksAction(data));
    } catch (error) {
        console.log(error);
    } finally {
        store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: false }));
    }
};
