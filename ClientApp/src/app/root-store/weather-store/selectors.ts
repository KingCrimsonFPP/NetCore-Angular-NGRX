import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeathersState } from './state';
import { weathersFeatureKey } from './reducer';

const selectWeathersFeatureState = createFeatureSelector<WeathersState>(weathersFeatureKey);

export const selectError = createSelector(
    selectWeathersFeatureState,
    state => state.error
);

export const selectIsLoading = createSelector(
    selectWeathersFeatureState,
    state => state.isLoading
);

export const selectWeathers = createSelector(
    selectWeathersFeatureState,
    state => state.weathers
);