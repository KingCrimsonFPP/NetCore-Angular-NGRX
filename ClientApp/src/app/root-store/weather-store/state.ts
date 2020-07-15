import { WeatherForecast } from "../../models/weather-forecast.model";
import { ILoadable } from "src/app/models/Interfaces/loadable.interface";

export interface WeathersState extends ILoadable  {
  weathers: WeatherForecast[];
}

export const initialState: WeathersState = {
  IsLoading: false,
  Error: null,
  weathers: [],
};