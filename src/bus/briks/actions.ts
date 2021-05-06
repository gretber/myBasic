// Instruments
import * as types from './types';

export const setTodosAction: types.SetDataContract = (payload) => ({
    type: types.SET_DATA,
    payload,
});

export const setNuBrikAction: types.SetNuBrikContract = (payload) => ({
    type: types.SET_NU_BRIK,
    payload,
});

// export const updateTodoAction: types.UpdateTodoContract = (payload) => ({
//     type: types.UPDATE_TODO,
//     payload,
// });

// export const deleteTodoAction: types.DeleteTodoContract = (payload) => ({
//     type: types.DELETE_TODO,
//     payload,
// });
