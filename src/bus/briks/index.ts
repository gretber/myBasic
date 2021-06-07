// Core
import { useEffect } from 'react';
import { useSelector } from '../../hooks';

// Api
import { fetchData,
    createBrik,
    updateSelection,
   
} from './api';

// Toglers
import { useTogglersRedux } from '../client';

export const useDataQuery = () => {
    
    useEffect(() => {
        fetchData();
    }, []);

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
