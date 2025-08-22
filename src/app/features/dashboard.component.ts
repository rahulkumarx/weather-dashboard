import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

import * as WeatherActions from '../shared/store/weather.actions';

import { SearchFormComponent } from './search-form.component';
import { ForecastChartComponent } from './forecast-chart.component';
import { WeatherMapComponent } from './weather-map.component';
import { WeatherState } from '../shared/store/weather.reducer';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [SearchFormComponent, ForecastChartComponent, WeatherMapComponent],
    template: `
    <div class="p-6 max-w-4xl mx-auto space-y-6">

    <!-- Search Form Always Visible -->
    <div class="bg-white p-6 rounded-2xl shadow-md">
        <app-search-form (search)="onSearch($event)" [city]="weather()?.name"></app-search-form>
    </div>

    <!-- Weather Cards -->
    @if (weather()) {

    <div class="max-w-md mx-auto mt-12">
    <div class="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-3xl shadow-xl">

        <!-- Top: City + Temp + Icon -->
        <div class="flex items-center justify-between mb-6">
        <div class="flex flex-col">
            <h2 class="text-2xl font-bold text-gray-800">{{ weather()?.name }}</h2>
            <p class="text-5xl font-extrabold text-blue-700 mt-1">{{ weather()?.main.temp }}°</p>
            <p class="text-gray-600 capitalize mt-1">{{ weather()?.weather[0]?.description }}</p>
        </div>
        <img 
            [src]="'https://openweathermap.org/img/wn/' + weather()?.weather[0]?.icon + '@2x.png'" 
            alt="icon" 
            class="w-24 h-24"
        />
        </div>

        <!-- Bottom: Weather Details Grid -->
        <div class="grid grid-cols-2 gap-4 bg-white/50 p-4 rounded-2xl backdrop-blur-sm text-gray-700 font-medium shadow-inner">
        <div class="flex items-center gap-2">💧 Humidity: {{ weather()?.main.humidity }}%</div>
        <div class="flex items-center gap-2">🌬️ Wind: {{ weather()?.wind.speed }} km/h</div>
        <div class="flex items-center gap-2">🌡️ Feels Like: {{ weather()?.main.feels_like }}°</div>
        <div class="flex items-center gap-2">🔼 Max: {{ weather()?.main.temp_max }}°</div>
        <div class="flex items-center gap-2">🔽 Min: {{ weather()?.main.temp_min }}°</div>
        <div class="flex items-center gap-2">📊 Pressure: {{ weather()?.main.pressure }} hPa</div>
        </div>

    </div>
    </div>


        <!-- Forecast Chart -->
        <div class="bg-white p-8 rounded-2xl shadow-md">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">3-Day Forecast</h3>
            <app-forecast-chart [data]="forecast()"></app-forecast-chart>
        </div>

        <!-- Interactive Map -->
        <div class="bg-white p-8 rounded-2xl shadow-md">
            <app-weather-map [weather]="weather()" (mapClick)="onMapClick($event)"></app-weather-map>
        </div>

    } @else {
        <p class="text-gray-500 text-center italic">🔍 Search for a city to see weather data.</p>
    }

    </div>
  `
})
export class DashboardComponent {
    private store = inject(Store<{ weather: WeatherState }>);

    // ✅ Convert store selectors to signals
    weather = toSignal(this.store.select(state => state.weather.weather), { initialValue: null });
    forecast = toSignal(this.store.select(state => state.weather.forecast), { initialValue: null });

    onSearch({ city, unit }: { city: string; unit: 'metric' | 'imperial' }) {
        // ✅ Dispatch NgRx action
        this.store.dispatch(WeatherActions.loadWeather({ city, unit }));
    }

    onMapClick(coords: { lat: number; lon: number }) {
        const normalizedLon = ((coords.lon + 180) % 360 + 360) % 360 - 180;
        this.store.dispatch(
            WeatherActions.loadWeatherByCoords({ lat: coords.lat, lon: normalizedLon, unit: 'metric' })
        );
    }
}
