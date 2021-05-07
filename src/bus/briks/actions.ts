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

// export const deleteTodoAction: types.DeleteTodoContract = (payload) => ({
//     type: types.DELETE_TODO,
//     payload,
// });
