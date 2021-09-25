import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IForecastResponse } from '../model/forcast-models';
import { BaseService } from './base.service';


const GET_FIVE_DAYS_FORCAST_PATH = `/forecast?q={city}&appid=${environment.weather_api_key}&units={unit}`

@Injectable({
  providedIn: 'root'
})
export class WeatherForcastService {

  constructor(private http: BaseService) { }

  getFiveDaysForcast(cityName: string, unit: string) {
    return this.http.getFromOpenWeather<IForecastResponse>(GET_FIVE_DAYS_FORCAST_PATH.replace('{city}', cityName).replace('{unit}', unit))
  }
}
