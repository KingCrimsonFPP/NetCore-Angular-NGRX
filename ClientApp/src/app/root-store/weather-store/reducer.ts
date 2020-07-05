import { initialState, WeathersState } from './state';
import { createReducer, on, Action } from '@ngrx/store';
import * as weatherActions from './actions';

export const weathersFeatureKey = "weathers";

const weathersReducer = createReducer(
    initialState,
    on(weatherActions.loadRequest, state => ({...state, isLoading: true, errorMessage: null})),    
    on(weatherActions.loadFailure, state => ({...state, isLoading: false, errorMessage: null})),
    on(weatherActions.loadSuccess, (state,action) => (
        {
            ...state,
            weathers: action.weathers,
            isLoading: false,
            errorMessage: null
        })),
);

export function weathersFeatureReducer(state: WeathersState | undefined, action: Action)
{
    return weathersReducer(state, action);
}