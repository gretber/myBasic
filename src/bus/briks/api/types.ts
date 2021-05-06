// Type
import { Project } from '../dataTypes';

// Fetch
export type FetchData = () => Promise<void>;

// Create
export type CreateBrikType = (input: Project) => Promise<void>;

// // Update
// export type UpdateTodoInput = {
//     todoId: string
//     body: {
//         isCompleted: boolean
//     }
// };
// export type UpdateTodo = (input: UpdateTodoInput) => Promise<void>;

// // Delete
// export type DeleteTodoInput = {
//     todoId: string
// };
// export type DeleteTodo = (input: DeleteTodoInput) => Promise<void>;
