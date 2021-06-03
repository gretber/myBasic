// Instruments
import * as types from './types';

export const setBriksAction: types.SetDataContract = (payload) => ({
    type: types.SET_DATA,
    payload,
});

export const setNuBrikAction: types.SetNuBrikContract = (payload) => ({
    type: types.SET_NU_BRIK,
    payload,
});

export const updateSelectionAction: types.UpdateSelectionContract = (payload) => ({
    type: types.UPDATE_SELECTION,
    payload,
});

export const deleteProjectAction: types.DeleteProjectContract = (payload) => ({
    type: types.DELETE_PROJECT,
    payload,
})

export const updateProjectAction: types.UpdateProjectContract = (payload) => ({
    type: types.UPDATE_PROJECT,
    payload,
});

export const sortProjectsAction: types.SortProjectsContract = () => ({type: types.SORT_PROJECTS});
// export const deleteTodoAction: types.DeleteTodoContract = (payload) => ({
//     type: types.DELETE_TODO,
//     payload,
// });
