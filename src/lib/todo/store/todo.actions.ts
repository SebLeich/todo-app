import { createAction } from '@ngrx/store';
import { Todo } from '../types/todo.type';

export const addTodo = createAction(
    '[Todo] Add todo',
    (todo: Todo) => ({ todo })
);