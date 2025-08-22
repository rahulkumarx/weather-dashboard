import { createAction, props } from '@ngrx/store';

export const loadWeather = createAction(
  '[Weather] Load Weather',
  props<{ city: string; unit: 'metric' | 'imperial' }>()
);

export const loadWeatherByCoords = createAction(
  '[Weather] Load Weather By Coordinates',
  props<{ lat: number; lon: number; unit?: 'metric' | 'imperial' }>()
);

export const loadWeatherSuccess = createAction(
  '[Weather] Load Weather Success',
  props<{ weather: any; forecast: any }>()
);

export const loadWeatherFailure = createAction(
  '[Weather] Load Weather Failure',
  props<{ error: any }>()
);
