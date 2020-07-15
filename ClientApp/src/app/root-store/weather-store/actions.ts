import { Action, createAction, props } from '@ngrx/store';
import { WeatherForecast } from '../../models/weather-forecast.model';

export const loadRequest = createAction(
    '[Weathers] Load Request'
);

export const loadFailure = createAction(
    '[Weathers] Load Failure',
    props<{error: string}>()
);

export const loadSuccess = createAction(
    '[Weathers] Load Success',
    props<{weathers: WeatherForecast[]}>()
);