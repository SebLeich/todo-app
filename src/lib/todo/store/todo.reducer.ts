import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Todo } from '../types/todo.type';
import { addTodo, deleteTodo, setTodos, updateTodo } from './todo.actions';

export const featureKey = 'todos';

function sort(a: Todo, b: Todo) {
	return a.index - b.index;
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
	on(addTodo, (state, { todo }) => adapter.addOne({ ...todo, created: new Date() }, state)),
	on(deleteTodo, (state, { todo }) => adapter.removeOne(todo.id, state)),
	on(setTodos, (state, { todos }) => adapter.setAll(todos, state)),
	on(updateTodo, (state, { todo }) => adapter.updateOne({
		id: todo.id,
		changes: {
			description: todo.description,
			isCompleted: todo.isCompleted,
			title: todo.title,
			index: todo.index,
		}
	}, state)),
);