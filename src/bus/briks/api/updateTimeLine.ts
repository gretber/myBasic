// Core
import moment from 'moment';

// Store
import { store } from '../../../@init';

// Actions
import { togglerCreatorAction } from '../../client';
import { setBriksAction } from '../actions';

// Types
import { Data } from '../types';




const InitBriksUrl = process.env.REACT_APP_INIT_BRIK_URL;

export const updateTimeLine = async (startDate:Date, endDate:Date, view:string) => {
    
    const userType = localStorage.getItem('schedulerUserType');

    if(userType === 'edit')
    {
        const login = localStorage.getItem('schedulerUserLogin');
        const password = localStorage.getItem('schedulerUserPassword')
        const strStartDate = moment(startDate).format('DD, MM, YYYY').replace(/[^0-9]/g, '');
        const strEndDate = moment(endDate).format('DD, MM, YYYY').replace(/[^0-9]/g, '')
        let serverView = '';
        if(view === 'Uge')
        {
            serverView = 'week';
        }
        else if(view ==='To uges')
        {
            serverView = '2weeks';
        }
        else if(view ==='Måned')
        {
            serverView = 'month';
        }
        else
        {
            serverView = '24weeks';
        }

     
        // store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: true }));

    

            

        const encoded = window.btoa(`${login}:${password}`)
        try {
            const response = await fetch(`${InitBriksUrl}&StartDate=${strStartDate}&EndDate=${strEndDate}&View=${serverView}&ViewType=team`, {
                method:  'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encoded}`,
                },
            });

            if (response.status !== 200) {
                throw new Error('Data fetch failed');
            }

            // const data: Data = await response.json();

            // store.dispatch(setBriksAction(data));
        } catch (error) {
            console.log(error);
        } 
        // finally {
        //     store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: false }));
        // }

};
};
