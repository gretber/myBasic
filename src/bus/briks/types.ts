export type Todo = {
    id: string
    text: string
    isCompleted: boolean
};

export type Todos = Todo[];

export type FetchBriks = () => Promise<Todos>;

// Create
export type CreateTodoInput = {
    body: {
        text: string
    }
};
export type CreateTodo = (input: CreateTodoInput) => Promise<Todo>;

// Update
export type UpdateTodoInput = {
    todoId: string
    body: {
        isCompleted: boolean
    }
};
export type UpdateTodo = (input: UpdateTodoInput) => Promise<Todo>;

// Delete
export type DeleteTodoInput = {
    todoId: string
};
export type DeleteTodo = (input: DeleteTodoInput) => Promise<boolean>;

