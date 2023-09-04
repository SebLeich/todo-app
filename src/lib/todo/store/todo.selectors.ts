import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, featureKey } from './todo.reducer';

export const todoState = createFeatureSelector<State>(featureKey);

export const selectTodo = (arg: string | null | undefined | (() => string | null | undefined)) => createSelector(
    todoState,
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