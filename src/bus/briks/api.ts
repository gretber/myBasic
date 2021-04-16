// Types
import { FetchBriks, CreateTodo, UpdateTodo, DeleteTodo } from './types';

// Instruments
const briksUrl = 'http://mail.vej.dk/IcopalKal/icokal.nsf/jsoninital?OpenAgent/';

export const fetchBriks: FetchBriks = async () => {
    const encoded = window.btoa('lei-lmk:AAABBB')

    const response = await fetch(briksUrl, {
        method:  'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encoded}`,
        },
        
    });

    if (response.status !== 200) {
        throw new Error('Briks fetch failed');
    }

    return response.json();
};

// export const createTodo: CreateTodo = async ({ body }) => {
//     const response = await fetch(todosUrl, {
//         method:  'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body:        JSON.stringify(body),
//     });

//     if (response.status !== 201) {
//         throw new Error('Todo create failed');
//     }

//     return response.json();
// };

// export const updateTodo: UpdateTodo = async ({ todoId, body }) => {
//     const response = await fetch(`${todosUrl}/${todoId}`, {
//         method:  'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body:        JSON.stringify(body),
//     });

//     if (response.status !== 200) {
//         throw new Error('Todo update failed');
//     }

//     return response.json();
// };

// export const deleteTodo: DeleteTodo = async ({ todoId }) => {
//     const response = await fetch(`${todosUrl}/${todoId}`, {
//         method:  'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//     });

//     if (response.status !== 200) {
//         throw new Error('Todo delete failed');
//     }

//     return response.json();
// };
