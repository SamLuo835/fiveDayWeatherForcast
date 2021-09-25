import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }

  getFromOpenWeather<T>(
    path: string,
    options = {},
  ): Observable<T> {
    return this.http.get<T>(`${environment.open_weather_api_base_url}${path}`, options);
  }
}
