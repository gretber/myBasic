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
        nonScheduled?: Array<Project>
    }
} | {};

// ----------------------------- Fetch -----------------------------
export const SET_DATA = 'SET_DATA';
export type SetDataActionType = {
    type: typeof SET_DATA;
    payload: Data;
};
export type SetDataContract = (payload: Data) => SetDataActionType

// ----------------------------- Fetch non scheduled briks -----------------------------

export const SET_NON_SCHEDULED_BRIKS = 'SET_NON_SCHEDULED_BRIKS';
export type setNonScheduledBriksActionType = {
    type: typeof SET_NON_SCHEDULED_BRIKS,
    payload: Array<Project>,
}

export type setNonScheduledBriksContract = (payload: Array<Project>) => setNonScheduledBriksActionType



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


// // ----------------------------- Update on drag and drop -----------------------------

export const SCHEDULE_PROJECT = 'SCHEDULE_PROJECT';
type ScheduleProjectActionType = {
    type: typeof SCHEDULE_PROJECT,
    payload: Project
} 

export type ScheduleProjectContract = (payload: Project) => ScheduleProjectActionType


export const UN_SCHEDULE_PROJECT = 'UN_SCHEDULE_PROJECT';
type UnSheduleProjectAtionType = {
    type: typeof UN_SCHEDULE_PROJECT,
    payload: Project,
} 

export type UnScheduleProjectContract = (payload:Project) => UnSheduleProjectAtionType

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

export type ProjectActionTypes =
    | SetDataActionType
    | SetNuBrikActionType
    | UpdateSelectionActionType
    | DeleteProjectActionType
    | UpdateProjectActionType
    | setNonScheduledBriksActionType
    | ScheduleProjectActionType
    | UnSheduleProjectAtionType