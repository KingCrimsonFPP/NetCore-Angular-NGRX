import { WeatherForecast } from "../../models/weather-forecast.model";
import { CollectionState } from "src/app/shared/interfaces/generic-state.interface";

export interface WeathersState extends CollectionState<WeatherForecast> {

}

export const initialState: WeathersState = {
  IsLoading: false,
  Error: null,
  Items: [],
};