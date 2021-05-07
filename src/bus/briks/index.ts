// Core
import { useEffect } from 'react';
import { useSelector } from '../../hooks';

// Api
import { fetchData,
    createBrik,
    updateSelection,
    // deleteTodo
} from './api';

// Toglers
import { useTogglersRedux } from '../client';

export const useDataQuery = () => {
    const data = useSelector(({ data }) => data);
    const { togglersRedux: { isDataFetching }} = useTogglersRedux();

    useEffect(() => {
        fetchData();
    }, []);

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
        // deleteTodo,
        loading: isDataFetching,
    };
};
