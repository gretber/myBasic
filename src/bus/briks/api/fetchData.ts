// Store
import { store } from '../../../@init';

// Actions
import { togglerCreatorAction } from '../../client';
import { setTodosAction } from '../actions';

// Types
import { FetchData } from './types';
import { Data } from '../types';

const briksUrlTest = 'http://mail.vej.dk/sn/icokal.nsf/jsoninital?OpenAgent';
//const API_URL = 'http://mail.vej.dk/IcopalKal/icokal.nsf/jsoninital?OpenAgent'

export const fetchData: FetchData = async () => {
    store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: true }));
    const encoded = window.btoa('lei-lmk:AAABBB')
    try {
        const response = await fetch(`${briksUrlTest}`, {
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

        store.dispatch(setTodosAction(data));
    } catch (error) {
        console.log(error);
    } finally {
        store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: false }));
    }
};
