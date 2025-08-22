import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as WeatherActions from './weather.actions';
import { WeatherService } from '../services/weather/weather.service';

export class WeatherEffects {
  private actions$ = inject(Actions);
  private weatherService = inject(WeatherService);

  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadWeather, WeatherActions.loadWeatherByCoords),
      mergeMap((action) => {
        if ('city' in action) {
          // 🔹 Load by city
          return this.weatherService.getWeatherAndForecast(action.city, action.unit).pipe(
            map(({ weather, forecast }) =>
              WeatherActions.loadWeatherSuccess({ weather, forecast })
            ),
            catchError((error) => of(WeatherActions.loadWeatherFailure({ error })))
          );
        } else {
          // 🔹 Load by coordinates
          return this.weatherService.getWeatherAndForecastByCoords(
            action.lat,
            action.lon,
            action.unit || 'metric'
          ).pipe(
            map(({ weather, forecast }) =>
              WeatherActions.loadWeatherSuccess({ weather, forecast })
            ),
            catchError((error) => of(WeatherActions.loadWeatherFailure({ error })))
          );
        }
      })
    )
  );
}
