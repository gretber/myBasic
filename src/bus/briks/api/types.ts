// Type
import { Project, Selections } from '../dataTypes';

// Fetch
export type FetchData = () => Promise<void>;

// Create
export type CreateBrikType = (input: Project) => Promise<void>;

// Update
export type UpdateSelectionInput = {
  root: {
    selections: Selections
  }
};
export type UpdateSelection = (input: UpdateSelectionInput) => Promise<void>;

// // Delete
// export type DeleteTodoInput = {
//     todoId: string
// };
// export type DeleteTodo = (input: DeleteTodoInput) => Promise<void>;
