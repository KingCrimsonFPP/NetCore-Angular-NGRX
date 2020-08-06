import { WeatherForecast } from "../../models/weather-forecast.model";
import { GenericState } from "src/app/models/Interfaces/generic-state.interface";

export interface WeathersState extends GenericState<WeatherForecast> {

}

export const initialState: WeathersState = {
  IsLoading: false,
  Error: null,
  Items: [],
};