import { Component, Inject } from "@angular/core";
import { WeatherForecast } from "../../models/weather-forecast.model";
import {
  WeathersStoreSelectors,
  WeathersStoreActions,
} from "../../root-store/weather-store";
import { select, Store } from "@ngrx/store";
import { RootStoreState } from "src/app/root-store";
import { Observable } from "rxjs";

@Component({
  selector: "app-weather",
  templateUrl: "./weather-container.component.html",
})
export class WeatherContainerComponent {
  // public forecasts$ = this.store.pipe(select(WeathersStoreSelectors.selectWeathers));

  forecasts$: Observable<WeatherForecast[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(private store$: Store<RootStoreState.RootState>) {}

  ngOnInit() {
    this.forecasts$ = this.store$.select(WeathersStoreSelectors.selectWeathers);

    this.error$ = this.store$.select(WeathersStoreSelectors.selectError);

    this.isLoading$ = this.store$.select(WeathersStoreSelectors.selectIsLoading);

    this.store$.dispatch(WeathersStoreActions.loadRequest());
  }

  onRefresh() {
    this.store$.dispatch(WeathersStoreActions.loadRequest());
  }
}
