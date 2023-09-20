import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, featureKey } from './comment.reducer';
import { Comment } from '../types/comment.type';

export const commentState = createFeatureSelector<State>(featureKey);

export const selectComment = (arg: string | null | undefined | (() => string | null | undefined)) => createSelector(
    commentState,
    (state: State) => {
        if (!state || !state.entities || typeof arg === 'undefined') {
            return null;
        }

        const identifier = typeof arg === 'function' ? arg() : arg;
        if (typeof identifier !== 'string') {
            return null;
        }

        return state.entities[identifier];
    }
);

export const selectComments = (todoId?: string) => createSelector(
    commentState,
    (state: State) => {
        const comments = ((state?.entities ? Object.values(state.entities) : []) as Comment[])
            .filter(comment => typeof todoId === 'string'? comment.todoId === todoId: true);

        return comments.sort((a, b) => a.index - b.index);
    }
);

export const selectNextIndex = createSelector(
    commentState,
    (state: State) => {
        const comments = (state?.entities ? Object.values(state.entities) : []) as Comment[];
        const maxIndex = comments.reduce((acc, cur) => Math.max(acc, cur.index), 0);
        return maxIndex + 1;
    }
);
