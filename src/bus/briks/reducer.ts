import { Reducer } from 'redux';

// Types
import * as types from './types';

const initialState: types.Data = {};

export const dataReducer: Reducer<types.Data, types.ProjectActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_DATA:
            return action.payload;

        case types.SET_NON_SCHEDULED_BRIKS:
             if('root' in state){
            return {...state, root: {...state.root, nonScheduled: action.payload}}
             }
             else return state;

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
        case types.DELETE_PROJECT: 
        {
            if('root' in state)
            { 
                return { ...state, root: {...state.root, projects: { project: [...state.root.projects.project.filter((project)=>{return project.id !== action.payload})] }}};
            }
            else
            {
                return state;
            }
        }
        case types.UPDATE_PROJECT: 
        {
            if('root' in state)
            {
                return { ...state, root: {...state.root, projects: { project: [...state.root.projects.project.map((p)=>{

                    if(p.id === action.payload.id)
                     {
                        return action.payload;
                     }
                     else return p;
                     })]}}};
            }
            
            else{
                return state;
            }
        }

        case types.SCHEDULE_PROJECT:
            {
                if('root' in state && state.root.nonScheduled)
                {
                    // console.log({...state, root: {...state.root, projects: {project: [...state.root.projects.project, action.payload]}, nonScheduled: [...state.root.nonScheduled.filter((project) => {return project.id !== action.payload.id})]}});
                  return {...state, root: {...state.root, projects: {project: [...state.root.projects.project, action.payload]}, nonScheduled: [...state.root.nonScheduled.filter((project) => {return project.id !== action.payload.id})]}};
                //   return state;
                }
                else {
                    return state;
                }
            }

        case types.UN_SCHEDULE_PROJECT:
            {
                if('root' in state && state.root.nonScheduled)
                {
                    return {...state, root: {...state.root, projects: {project: [...state.root.projects.project.filter((project) => { return project.id !== action.payload.id})]}, nonScheduled: [...state.root.nonScheduled, action.payload]}}
                }
                else{ 
                return  state;
                }
            }
        default:
        return state;
    }
};
