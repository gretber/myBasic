// Core
import { useEffect } from 'react';
import { useSelector } from '../../hooks';

// Api
import { fetchData,
    // createTodo,
    // updateTodo,
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

// export const useTodosMutations = () => {
//     const { togglersRedux: { isTodosFetching }} = useTogglersRedux();

//     return {
//         createTodo,
//         updateTodo,
//         deleteTodo,
//         loading: isTodosFetching,
//     };
// };
