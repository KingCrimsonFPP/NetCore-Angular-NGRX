import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CounterStoreModule } from './counter-store';
import { BoardsStoreModule } from './boards-store';
import { WeatherStoreModule } from './weather-store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BoardsStoreModule,
    CounterStoreModule,
    WeatherStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ]
})
export class RootStoreModule { }
