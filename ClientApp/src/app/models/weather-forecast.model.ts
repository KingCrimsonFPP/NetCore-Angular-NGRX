import { Identificable } from "./Interfaces/identificable.interface";
import { Loadable } from "./Interfaces/loadable.interface";

export interface WeatherForecast extends Identificable, Loadable{
  Id: Number;
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}