// Instruments
import * as types from './types';

export const setTodosAction: types.SetDataContract = (payload) => ({
    type: types.SET_DATA,
    payload,
});

// export const setTodoAction: types.SetTodoContract = (payload) => ({
//     type: types.SET_TODO,
//     payload,
// });

// export const updateTodoAction: types.UpdateTodoContract = (payload) => ({
//     type: types.UPDATE_TODO,
//     payload,
// });

// export const deleteTodoAction: types.DeleteTodoContract = (payload) => ({
//     type: types.DELETE_TODO,
//     payload,
// });
