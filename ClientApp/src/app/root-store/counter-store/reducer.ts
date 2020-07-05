import { initialState } from './state';
import { createReducer, on } from '@ngrx/store';
import * as counterActions from './actions';

export const counterFeatureKey = "counter";

const counterReducer = createReducer(
    initialState,
    on(counterActions.increment, state => ({...state, counter: state.counter + 1})),
    on(counterActions.decrement, state => ({...state, counter: state.counter - 1})),
    on(counterActions.reset, state => ({...state, counter:0})),
);

export function counterFeatureReducer(state, action)
{
    return counterReducer(state, action);
}