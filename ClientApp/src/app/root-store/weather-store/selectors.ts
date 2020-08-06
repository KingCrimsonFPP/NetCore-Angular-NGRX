import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeathersState } from './state';
import { weathersFeatureKey } from './reducer';

const selectWeathersFeatureState = createFeatureSelector<WeathersState>(weathersFeatureKey);

export const selectError = createSelector(
    selectWeathersFeatureState,
    state => state.Error
);

export const selectIsLoading = createSelector(
    selectWeathersFeatureState,
    state => state.IsLoading
);

export const selectWeathers = createSelector(
    selectWeathersFeatureState,
    state => state.Items
);