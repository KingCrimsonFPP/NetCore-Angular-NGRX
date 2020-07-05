import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { weathersFeatureKey, weathersFeatureReducer } from './reducer';
import { WeathersEffects } from './effects';
import { WeatherForecastService  } from '../../services/weather.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(weathersFeatureKey, weathersFeatureReducer),
    EffectsModule.forFeature([WeathersEffects])
  ],
  providers: [WeathersEffects,WeatherForecastService],  
})
export class WeatherStoreModule { }