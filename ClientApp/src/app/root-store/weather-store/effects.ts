import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import {of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { WeatherForecastService } from '../../services/weather.service';
import * as weatherActions from './actions';
import { Action } from '@ngrx/store';

@Injectable()
export class WeathersEffects
{
    constructor(
        private actions$: Actions,
        private service: WeatherForecastService
    ) { }

    loadRequest$ : Observable<Action> = createEffect(()=>
         this.actions$.pipe(
            ofType(weatherActions.loadRequest),
            switchMap(() => 
            this.service.GetAllWeatherForecast().pipe(
                map( weathers => weatherActions.loadSuccess({weathers})),
                catchError(error => of(weatherActions.loadFailure({errorMessage:error})))
                ),            
            ),
        )
    );
    
}