import { createAction } from '@ngrx/store';
import { Todo } from '../types/todo.type';

export const addTodo = createAction(
    '[Todo] Add todo',
    (todo: Todo) => ({ todo })
);

export const deleteTodo = createAction(
    '[Todo] Delete todos',
    (todo: Todo) => ({ todo })
);

export const setTodos = createAction(
    '[Todo] Set todos',
    (todos: Todo[]) => ({ todos })
);

export const updateTodo = createAction(
    '[Todo] Update todo',
    (todo: Todo) => ({ todo })
);
