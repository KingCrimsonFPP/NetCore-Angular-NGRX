import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  RootStoreState,
  CounterStoreActions,
  CounterStoreSelectors } from '../../root-store';

@Component({
  selector: 'app-counter-container',
  templateUrl: './counter-container.component.html'
})
export class CounterContainerComponent {

  count$: Observable<number> = this.store.pipe(select(CounterStoreSelectors.selectCounter));
  
  constructor(private store: Store<RootStoreState.RootState>) { }
 
  increment() {
    this.store.dispatch(CounterStoreActions.increment());
  }
 
  decrement() {
    this.store.dispatch(CounterStoreActions.decrement());
  }
 
  reset() {
    this.store.dispatch(CounterStoreActions.reset());
  }
}
