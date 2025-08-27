import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [MatCardModule, MatProgressSpinnerModule, DatePipe, NgIf],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  weather: any;
  loading = true;
  error = '';

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    // Example: Amsterdam coordinates
    this.weatherService.getCurrentWeather(52.377956, 4.897070)
      .subscribe({
        next: (data) => {
          this.weather = data.current_weather;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Could not load weather data';
          this.loading = false;
        }
      });
  }

  getWeatherIcon(code: number): string {
    const icons: { [key: number]: string } = {
      0: '☀️', // Clear
      1: '🌤️',
      2: '⛅',
      3: '☁️',
      45: '🌫️',
      48: '🌫️',
      51: '🌦️',
      61: '🌧️',
      71: '❄️',
      95: '⛈️'
    };
    return icons[code] || '🌡️';
  }

}
