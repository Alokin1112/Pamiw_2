import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { City } from '@core/interfaces/city.interface';
import { Forecast, ForecastHour } from '@core/interfaces/weather.interface';
import { WeatherService } from '@core/services/weather.service';
import { CitySearchComponent } from '@modules/city-search/city-search.component';
import { BehaviorSubject, Observable, filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'ds-content',
  standalone: true,
  imports: [CommonModule, CitySearchComponent],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    WeatherService,
  ]
})
export class ContentComponent implements OnInit {
  city$ = new BehaviorSubject<City>(null);
  temperature$: Observable<number>;
  yestardaysTemperature$: Observable<number>;
  forecastOneDay$: Observable<Forecast>;
  forecastFiveDay$: Observable<Forecast>;
  forecastOneHour$: Observable<ForecastHour>;
  forecastTwelveHour$: Observable<ForecastHour>;

  weatherService = inject(WeatherService);

  ngOnInit(): void {
    const dataSource = this.city$.asObservable().pipe(filter(res => !!res));

    this.temperature$ = dataSource.pipe(
      switchMap((res) => this.weatherService.getCurrentWeather(res?.Key)),
      map((res) => res?.Temperature?.Metric?.Value),
    );

    this.yestardaysTemperature$ = dataSource.pipe(
      switchMap((res) => this.weatherService.getYesterdaysWeather(res?.Key)),
      map((res) => res?.Temperature?.Metric?.Value),
    );

    this.forecastOneDay$ = dataSource.pipe(
      switchMap((res) => this.weatherService.getForecast_1Day(res?.Key)),
    );

    this.forecastFiveDay$ = dataSource.pipe(
      switchMap((res) => this.weatherService.getForecast_5Day(res?.Key)),
    );

    this.forecastOneHour$ = dataSource.pipe(
      switchMap((res) => this.weatherService.getForecast_1Hour(res?.Key)),
    );

    this.forecastTwelveHour$ = dataSource.pipe(
      switchMap((res) => this.weatherService.getForecast_12Hour(res?.Key)),
    );
  }

  handleCityChange(city: City): void {
    this.city$.next(city);
  }
}
