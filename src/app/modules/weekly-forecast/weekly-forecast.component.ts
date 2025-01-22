import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js';
import { WeeklyForecastService } from '../../core/services/weekly-forecast/weekly-forecast.service';
import { ForecastItem } from '../../models/weekly-forecast/weekly-forecast.model';


@Component({
  selector: 'app-weekly-forecast',
  templateUrl: './weekly-forecast.component.html',
  styleUrls: ['./weekly-forecast.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class WeeklyForecastComponent implements OnInit {
  forecast: ForecastItem[] = [];
  errorMessage: string = '';
  city: string = '';
  country: string = '';
  countries: string[] = ['US', 'GB', 'ES', 'FR', 'DE'];
  cities: { name: string; code: string; country: string }[] = [
    { name: 'New York', code: 'NYC', country: 'US' },
    { name: 'Los Angeles', code: 'LA', country: 'US' },
    { name: 'London', code: 'LON', country: 'GB' },
    { name: 'Madrid', code: 'MAD', country: 'ES' },
    { name: 'Paris', code: 'PAR', country: 'FR' },
    { name: 'Berlin', code: 'BER', country: 'DE' },
  ];

  constructor(private weeklyForecastService: WeeklyForecastService) {}

  ngOnInit(): void {
    this.city = 'London';
    this.country = 'GB';
    this.getForecast(this.city, this.country);
  }

  getForecast(city: string, country: string): void {
    if (!city || !country) {
      this.errorMessage = 'Por favor, ingresa una ciudad y selecciona un país.';
      return;
    }

    this.weeklyForecastService.getWeeklyForecast(city, country).subscribe({
      next: (data: any) => {
        const groupedByDay: any = {};

        data.list.forEach((item: any) => {
          const date = item.dt_txt.split(' ')[0];
          if (!groupedByDay[date]) {
            groupedByDay[date] = [];
          }
          groupedByDay[date].push(item);
        });

        this.forecast = Object.keys(groupedByDay).map((date) => {
          const items = groupedByDay[date];
          const description = items[0].weather[0].description;
          let iconClass = '';

          if (description.includes('clear')) {
            iconClass = 'weather-clear';
          } else if (description.includes('cloud')) {
            iconClass = 'weather-clouds';
          } else if (description.includes('rain')) {
            iconClass = 'weather-rain';
          } else if (description.includes('snow')) {
            iconClass = 'weather-snow';
          } else if (description.includes('thunderstorm')) {
            iconClass = 'weather-thunderstorm';
          } else if (description.includes('drizzle')) {
            iconClass = 'weather-drizzle';
          }

          return {
            date: new Date(date),
            tempMax: Math.max(...items.map((i: any) => i.main.temp_max)),
            tempMin: Math.min(...items.map((i: any) => i.main.temp_min)),
            description,
            icon: items[0].weather[0].icon,
            iconClass,
          };
        });

        this.createForecastChart(); // Crear el gráfico con los datos procesados
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error al obtener el pronóstico:', err);
        this.errorMessage =
          'Error al obtener los datos del pronóstico. Por favor, verifica la ciudad o intenta más tarde.';
      },
    });
  }

  createForecastChart(): void {
    const labels = this.forecast.map((item) =>
      item.date.toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: '2-digit' })
    );

    const tempMaxData = this.forecast.map((item) => item.tempMax);
    const tempMinData = this.forecast.map((item) => item.tempMin);

    new Chart('forecastChart', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Temp. Máxima (°C)',
            data: tempMaxData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 2,
          },
          {
            label: 'Temp. Mínima (°C)',
            data: tempMinData,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }
}






