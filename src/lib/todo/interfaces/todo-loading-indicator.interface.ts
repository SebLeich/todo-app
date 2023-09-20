import { InjectionToken, Signal } from "@angular/core";

export interface ITodoLoadingIndicator 
{
    todosLoading: Signal<boolean>;
    todosLoaded: Signal<boolean>;
}

export const TODO_LOADING_INDICATOR = new InjectionToken<ITodoLoadingIndicator>('TODO_LOADING_INDICATOR');