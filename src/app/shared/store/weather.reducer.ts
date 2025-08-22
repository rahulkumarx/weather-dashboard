import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from './weather.actions';

export interface WeatherState {
  weather: any | null;
  forecast: any | null;
  loading: boolean;
  error: any | null;
}

export const initialState: WeatherState = {
  weather: null,
  forecast: null,
  loading: false,
  error: null,
};

export const weatherReducer = createReducer(
  initialState,

  on(WeatherActions.loadWeather, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(WeatherActions.loadWeatherSuccess, (state, { weather, forecast }) => ({
    ...state,
    weather,
    forecast,
    loading: false,
  })),

  on(WeatherActions.loadWeatherFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
