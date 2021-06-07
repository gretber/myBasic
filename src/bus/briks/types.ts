import { User, View, Projects, Teams, Factories, Leaders, Districs, JobTypes, Selections, Project, SelectionValues } from './dataTypes'

export type Data = {
    root: {
        user: User,
        view: View,
        projects: Projects,
        teams: Teams,
        factories: Factories,
        leaders: Leaders,
        districs: Districs,
        jobTypes: JobTypes,
        selections: Selections,
    }
} | {};

// ----------------------------- Fetch -----------------------------
export const SET_DATA = 'SET_DATA';
export type SetDataActionType = {
    type: typeof SET_DATA;
    payload: Data;
};
export type SetDataContract = (payload: Data) => SetDataActionType


// ----------------------------- Create -----------------------------
export const SET_NU_BRIK = 'SET_NU_BRIK';
export type SetNuBrikActionType = {
    type: typeof SET_NU_BRIK;
    payload: Project;
};
export type SetNuBrikContract = (payload: Project) => SetNuBrikActionType


// // ----------------------------- Update -----------------------------
export const UPDATE_SELECTION = 'UPDATE_SELECTION';
type UpdateSelectionPayload = {
            root: {
                selections: Selections
            }
}

export type UpdateSelectionActionType = {
    type: typeof UPDATE_SELECTION;
    payload: UpdateSelectionPayload
};

export type UpdateSelectionContract = (payload: UpdateSelectionPayload) => UpdateSelectionActionType



// --------------------------------Delete project-----------------------


export const DELETE_PROJECT = 'DELETE_PROJECT';
type DeleteProjectActionType = {
    type: typeof DELETE_PROJECT,
    payload: string,   
}

export type DeleteProjectContract = (payload:string) => DeleteProjectActionType


// --------------------------------Update project-----------------------

export const UPDATE_PROJECT = 'UPDATE_PROJECT';
type UpdateProjectActionType = {
    type: typeof UPDATE_PROJECT,
    payload: Project
}

export type UpdateProjectContract = (payload: Project) => UpdateProjectActionType



 // ----------------------------- Sort projects -----------------------------

export const  SORT_PROJECTS = 'SORT_PROJECTS';
type SortProjectsActionType = {
    type: typeof SORT_PROJECTS
}

export type SortProjectsContract = () => SortProjectsActionType



export type ProjectActionTypes =
    | SetDataActionType
    | SetNuBrikActionType
    | UpdateSelectionActionType
    | DeleteProjectActionType
    | UpdateProjectActionType
    | SortProjectsActionType
