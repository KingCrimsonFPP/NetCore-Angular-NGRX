import { WeatherForecast } from "../../models/weather-forecast.model";

export interface WeathersState {
  weathers: WeatherForecast[];
  isLoading?: boolean;
  error?: any;
}

export const initialState: WeathersState = {
  isLoading: false,
  error: null,
  weathers: [],
};