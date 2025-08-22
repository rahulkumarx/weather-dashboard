import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-weather-map',
  standalone: true,
  template: `<div id="map" style="height: 400px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);"></div>`,
})
export class WeatherMapComponent implements OnInit, OnChanges {
  @Input() weather: any; // current weather for marker
  @Output() mapClick = new EventEmitter<{ lat: number; lon: number }>();

  private map!: L.Map;
  private marker?: L.Marker;

  ngOnInit(): void {
    this.map = L.map('map', { center: [20, 0], zoom: 2 });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // emit coordinates on click
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.mapClick.emit({ lat: e.latlng.lat, lon: e.latlng.lng });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weather'] && this.weather && this.map) {
      const { coord, main, name } = this.weather;

      // Remove old marker
      if (this.marker) this.marker.remove();

      // Zoom & add marker
      this.map.setView([coord.lat, coord.lon], 8, { animate: true });
      this.marker = L.marker([coord.lat, coord.lon])
        .addTo(this.map)
        .bindPopup(`<b>${name}</b><br>🌡️ ${main.temp}°C<br>Humidity: ${main.humidity}%<br>Wind: ${this.weather.wind.speed} m/s`)
        .openPopup();
    }
  }
}
