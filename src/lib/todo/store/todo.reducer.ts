import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Todo } from '../types/todo.type';
import { addTodo } from './todo.actions';

export const featureKey = 'todos';

function sort(a: Todo, b: Todo) {
    return a.id > b.id ? 1 : -1;
  }

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
    selectId: (todo: Todo) => todo.id,
    sortComparer: sort
  });
  
  export interface State extends EntityState<Todo> {
    ids: string[];
  }
  
  export const initialState: State = {
    ids: [],
    entities: {}
  };

export const reducer = createReducer(
    initialState,

    on(addTodo, (state, { todo }) => adapter.addOne(todo, state)),
);