import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Todo } from '../types/todo.type';
import { addTodo, updateTodo } from './todo.actions';

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
    ids: ['1', '2', '3'],
    entities: {
      '1': { id: '1', title: 'my todo' } as Todo,
      '2': { id: '2', title: 'another todo' } as Todo,
      '3': { id: '3', title: 'something else' } as Todo
    }
  };

export const reducer = createReducer(
    initialState,
    on(addTodo, (state, { todo }) => adapter.addOne(todo, state)),
    on(updateTodo, (state, { todo }) => adapter.updateOne({
      id: todo.id,
      changes: {
        description: todo.description,
        isCompleted: todo.isCompleted,
        title: todo.title,
      }
    }, state)),
);