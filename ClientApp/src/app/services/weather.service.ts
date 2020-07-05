import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherForecast } from '../models/weather-forecast.model';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherForecastService
{

    constructor(
        private http: HttpClient,
         @Inject('BASE_URL') private baseUrl: string
      ) {}

      public GetAllWeatherForecast() : Observable<WeatherForecast[]>
      {
        return this.http.get<WeatherForecast[]>(this.baseUrl + 'api/WeatherForecast/all');
      }
}