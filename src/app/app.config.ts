import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { weatherReducer } from './shared/store/weather.reducer';
import { WeatherEffects } from './shared/store/weather.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore({ weather: weatherReducer }),   // ✅ NgRx Store provider
    provideEffects([WeatherEffects]),            // ✅ NgRx Effects provider
    // provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
