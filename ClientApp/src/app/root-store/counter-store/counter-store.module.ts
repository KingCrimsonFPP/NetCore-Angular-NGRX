import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { counterFeatureReducer,counterFeatureKey } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(counterFeatureKey, counterFeatureReducer),
  ],
})
export class CounterStoreModule { }