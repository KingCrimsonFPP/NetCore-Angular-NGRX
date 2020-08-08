import { WeatherForecast } from "../../models/weather-forecast.model";
import { GenericState } from "src/app/shared/interfaces/generic-state.interface";

export interface WeathersState extends GenericState<WeatherForecast> {

}

export const initialState: WeathersState = {
  IsLoading: false,
  Error: null,
  Items: [],
};