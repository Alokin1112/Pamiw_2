import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '@core/constants/Api.const';
import { City } from '@core/interfaces/city.interface';
import { Forecast, ForecastHour, Weather } from '@core/interfaces/weather.interface';
import { environment } from '@env/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private http = inject(HttpClient);

  getLocations(city: string): Observable<City[]> {
    const params = (new HttpParams()).append("q", city);

    return this.http.get<City[]>(`${environment.httpBackend}${API.AUTOCOMPLETE_ENDPOINT}`, { params });
  }

  getCurrentWeather(cityKey: string): Observable<Weather> {
    return this.http.get<Weather[]>(`${environment.httpBackend}${API.CURRENT_CONDITION_TEMPLATE.replace(":locationKey", cityKey)}`).pipe(
      map((res) => res?.at(0))
    );
  }

  getYesterdaysWeather(cityKey: string): Observable<Weather> {
    return this.http.get<Weather[]>(`${environment.httpBackend}${API.YESTERDAYS_TEMPERATURE.replace(":locationKey", cityKey)}`).pipe(
      map((res) => res?.at(0))
    );
  }

  getForecast_1Day(cityKey: string): Observable<Forecast> {
    const params = (new HttpParams()).append("metric", true);
    return this.http.get<Forecast>(`${environment.httpBackend}${API.ONE_DAY_FORECAST.replace(":locationKey", cityKey)}`, { params });
  }

  getForecast_5Day(cityKey: string): Observable<Forecast> {
    const params = (new HttpParams()).append("metric", true);
    return this.http.get<Forecast>(`${environment.httpBackend}${API.FIVE_DAY_FORECAST.replace(":locationKey", cityKey)}`, { params });
  }

  getForecast_1Hour(cityKey: string): Observable<ForecastHour> {
    const params = (new HttpParams()).append("metric", true);
    return this.http.get<ForecastHour[]>(`${environment.httpBackend}${API.ONE_HOUR_FORECAST.replace(":locationKey", cityKey)}`, { params }).pipe(
      map((res) => res?.at(0))
    );
  }

  getForecast_12Hour(cityKey: string): Observable<ForecastHour> {
    const params = (new HttpParams()).append("metric", true);
    return this.http.get<ForecastHour[]>(`${environment.httpBackend}${API.TWELVE_HOUR_FORECAST.replace(":locationKey", cityKey)}`, { params }).pipe(
      map((res) => res?.at(0))
    );
  }

}
