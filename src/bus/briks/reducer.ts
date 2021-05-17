import { Reducer } from 'redux';

// Types
import * as types from './types';

const initialState: types.Data = {};

export const dataReducer: Reducer<types.Data, types.TodosActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_DATA:
            return action.payload;

        case types.SET_NU_BRIK:
            if('root' in state){
                return { ...state, root: {...state.root, projects: { project: [...state.root.projects.project, action.payload] }}}
            } else {
                return state
            }
        case types.UPDATE_SELECTION:
            if('root' in state){
                return { ...state, root: {...state.root, selections: action.payload.root.selections} }
            } else {
                return state
            }
            
            

        // case types.SET_TODO:
        //     return [ action.payload, ...state ];

        // case types.UPDATE_TODO:
        //     return state.map((todo) => {
        //         if (todo.id === action.payload.id) {
        //             return action.payload;
        //         }

        //         return todo;
        //     });

        // case types.DELETE_TODO:
        //     return state.filter((todo) => todo.id !== action.payload);

        default:
            return state;
    }
};
