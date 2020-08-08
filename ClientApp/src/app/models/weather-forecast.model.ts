import { Identificable } from "../shared/interfaces/identificable.interface";
import { Loadable } from "../shared/interfaces/loadable.interface";

export interface WeatherForecast extends Identificable, Loadable{
  Id: Number;
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}