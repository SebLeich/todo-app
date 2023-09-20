import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Comment } from '../types/comment.type';
import { addComment, deleteComment, setComments, updateComment } from './comment.actions';
import { deleteTodo } from 'src/lib/todo/store/todo.actions';

export const featureKey = 'comments';

function sort(a: Comment, b: Comment) {
	return a.index - b.index;
}

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
	selectId: (comment: Comment) => comment.id,
	sortComparer: sort
});

export interface State extends EntityState<Comment> {
	ids: string[];
}

export const initialState: State = {
	ids: [],
	entities: {}
};

export const reducer = createReducer(
	initialState,
	on(addComment, (state, { comment }) => adapter.addOne({ ...comment, created: new Date() }, state)),
	on(deleteComment, (state, { comment }) => adapter.removeOne(comment.id, state)),
	on(deleteTodo, (state, { todo }) => {
		const comments: Comment[] = Object.values(state.entities).filter((comment) => comment?.todoId === todo.id) as Comment[];
		return adapter.removeMany(comments.map((comment) => comment?.id), state);
	}),
	on(setComments, (state, { comments }) => adapter.setAll(comments, state)),
	on(updateComment, (state, { comment }) => adapter.updateOne({
		id: comment.id,
		changes: {
			content: comment.content,
			title: comment.title,
			index: comment.index,
		}
	}, state)),
);