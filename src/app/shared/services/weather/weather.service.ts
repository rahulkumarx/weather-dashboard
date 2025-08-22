import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
    private http = inject(HttpClient);
    private apiKey = '279b4be6d54c8bf6ea9b12275a567156';
    private baseUrl = 'https://api.openweathermap.org/data/2.5';

    getWeather(city: string, unit: 'metric' | 'imperial') {
        return this.http.get<any>(
            `${this.baseUrl}/weather?q=${city}&units=${unit}&appid=${this.apiKey}`
        );
    }

    getForecast(city: string, unit: 'metric' | 'imperial') {
        return this.http.get<any>(
            `${this.baseUrl}/forecast?q=${city}&units=${unit}&cnt=3&appid=${this.apiKey}`
        );
    }

    getWeatherAndForecast(city: string, unit: 'metric' | 'imperial') {
        return forkJoin({
            weather: this.getWeather(city, unit),
            forecast: this.getForecast(city, unit)
        }).pipe(
            map((response) => ({
                weather: response.weather,
                forecast: response.forecast
            }))
        );
    }

    getWeatherAndForecastByCoords(lat: number, lon: number, unit: 'metric' | 'imperial') {
        const weather$ = this.http.get(`${this.baseUrl}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${this.apiKey}`);
        const forecast$ = this.http.get(`${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&units=${unit}&cnt=3&appid=${this.apiKey}`);

        return forkJoin({ weather: weather$, forecast: forecast$ });
    }

}
