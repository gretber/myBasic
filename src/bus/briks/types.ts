import { User, View, Projects, Teams, Factories, Leaders, Districs, JobTypes, Selections } from './dataTypes'

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

// // ----------------------------- Create -----------------------------
// export const SET_TODO = 'SET_TODO';
// export type SetTodoActionType = {
//     type: typeof SET_TODO;
//     payload: Todo;
// };
// export type SetTodoContract = (payload: Todo) => SetTodoActionType

// // ----------------------------- Update -----------------------------
// export const UPDATE_TODO = 'UPDATE_TODO';
// export type UpdateTodoActionType = {
//     type: typeof UPDATE_TODO;
//     payload: Todo;
// };
// export type UpdateTodoContract = (payload: Todo) => UpdateTodoActionType

// // ----------------------------- Delete -----------------------------
// export const DELETE_TODO = 'DELETE_TODO';
// export type DeleteTodoActionType = {
//     type: typeof DELETE_TODO;
//     payload: string;
// };
// export type DeleteTodoContract = (payload: string) => DeleteTodoActionType

export type TodosActionTypes =
    | SetDataActionType
    // | SetTodoActionType
    // | UpdateTodoActionType
    // | DeleteTodoActionType

