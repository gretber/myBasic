// Core
import moment from 'moment';

// Helpers
import { getUserLoginData } from '../../../helpers/getUserLoginData';

// Types
import { fetchData } from './fetchData';

const InitBriksUrl = process.env.REACT_APP_INIT_BRIK_URL;

export const updateTimeLine = async (startDate:Date, endDate:Date, view:string) => {
    
        const {login, password} = getUserLoginData();
        const strStartDate = moment(startDate).format('DD, MM, YYYY').replace(/[^0-9]/g, '');
        const strEndDate = moment(endDate).format('DD, MM, YYYY').replace(/[^0-9]/g, '')

        let serverView = '';
        
        if(view === 'Uge')
        {
            serverView = 'week';
        }
        else if(view ==='To uger')
        {
            serverView = '2weeks';
        }
        else if(view ==='Måned')
        {
            serverView = 'month';
        }
        else if(view === '24 uger')
        {
            serverView = '24weeks';
        }
        else 
        {
            serverView = 'other'
        }
        console.log(serverView);
        const encoded = window.btoa(`${login}:${password}`);
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
           fetchData();
        } catch (error) {
            console.log(error);
        } 
};

