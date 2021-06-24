// Core
import { useEffect } from 'react';
import { useSelector } from '../../hooks';

// Api
import { fetchData,
    createBrik,
    updateSelection,
    fetchNonScheduledBriks,
} from './api';

// Toglers
import { useTogglersRedux } from '../client';

export const useDataQuery = () => {
    
    useEffect(() => {
        const fetch = async () => {await fetchData(); fetchNonScheduledBriks();}
         fetch();
      
    // fetchData();
    // fetchNonScheduledBriks();
        
    }, []);
    
    // useEffect(() => {
    //     // fetchData();
    //     fetchNonScheduledBriks();
    // }, []);
    

    const data = useSelector(({ data }) => data);
    const { togglersRedux: { isDataFetching }} = useTogglersRedux();

    return {
        data,
        loading: isDataFetching,
    };
};

export const useBriksMutations = () => {
    const { togglersRedux: { isDataFetching }} = useTogglersRedux();

    return {
        createBrik,
        updateSelection,
        
        loading: isDataFetching,
    };
};
