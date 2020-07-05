import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './state';
import { counterFeatureKey } from './reducer';

const selectCounterFeatureState = createFeatureSelector<CounterState>(counterFeatureKey);

export const selectError = createSelector(
    selectCounterFeatureState,
    state => state.error
);

export const selectIsLoading = createSelector(
    selectCounterFeatureState,
    state => state.isLoading
);

export const selectCounter = createSelector(
    selectCounterFeatureState,
    state => state.counter
);