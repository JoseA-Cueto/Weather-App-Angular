import { Component, OnInit } from '@angular/core';
import { WeeklyForecastService } from '../../service/weekly-forecast/weekly-forecast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weekly-forecast',
  templateUrl: './weekly-forecast.component.html',
  styleUrls: ['./weekly-forecast.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class WeeklyForecastComponent implements OnInit {
  forecast: any[] = [];

  constructor(private weeklyForecastService: WeeklyForecastService) {}

  ngOnInit(): void {
    this.getForecast('London');
  }

  getForecast(city: string): void {
    this.weeklyForecastService.getWeeklyForecast(city).subscribe({
      next: (data) => {
        this.forecast = data.list.map((item: any) => ({
          date: new Date(item.dt * 1000),
          tempMax: item.temp.max,
          tempMin: item.temp.min,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        }));
      },
      error: (err) => console.error('Error fetching forecast:', err),
    });
  }
}

