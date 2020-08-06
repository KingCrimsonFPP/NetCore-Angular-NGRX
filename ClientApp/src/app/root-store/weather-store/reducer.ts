import { initialState, WeathersState } from './state';
import { createReducer, on, Action } from '@ngrx/store';
import * as weatherActions from './actions';

export const weathersFeatureKey = "weathers";

const weathersReducer = createReducer(
    initialState,
    on(weatherActions.loadRequest, state => ({...state, IsLoading: true, Error: null})),    
    on(weatherActions.loadFailure, state => ({...state, IsLoading: false, Error: null})),
    on(weatherActions.loadSuccess, (state,action) => (
        {
            ...state,
            Items: action.weathers,
            IsLoading: false,
            Error: null
        })),
);

export function weathersFeatureReducer(state: WeathersState | undefined, action: Action)
{
    return weathersReducer(state, action);
}