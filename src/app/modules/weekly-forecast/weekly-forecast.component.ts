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
  errorMessage: string = '';
  city: string = '';  // Variable para la ciudad seleccionada
  country: string = '';  // Variable para el país seleccionado
  countries: string[] = ['US', 'GB', 'ES', 'FR', 'DE']; // Ejemplo de países para elegir

  // Lista de ciudades disponibles con sus respectivos países
  cities: { name: string, code: string, country: string }[] = [
    { name: 'New York', code: 'NYC', country: 'US' },
    { name: 'Los Angeles', code: 'LA', country: 'US' },
    { name: 'London', code: 'LON', country: 'GB' },
    { name: 'Madrid', code: 'MAD', country: 'ES' },
    { name: 'Paris', code: 'PAR', country: 'FR' },
    { name: 'Berlin', code: 'BER', country: 'DE' },
  ];

  constructor(private weeklyForecastService: WeeklyForecastService) {}

  ngOnInit(): void {
    // Ciudad y país por defecto
    this.city = 'London'; 
    this.country = 'GB'; 
    this.getForecast(this.city, this.country);  
  }

  // Método para obtener el pronóstico con ciudad y país
  getForecast(city: string, country: string): void {
    if (!city || !country) {
      this.errorMessage = 'Por favor, ingresa una ciudad y selecciona un país.';
      return;
    }

    this.weeklyForecastService.getWeeklyForecast(city, country).subscribe({
      next: (data: any) => {
        console.log('Datos obtenidos de la API:', data); // Para depuración

        // Agrupar los datos por fecha
        const groupedByDay: any = {};

        data.list.forEach((item: any) => {
          const date = item.dt_txt.split(' ')[0]; // Extrae solo la fecha (YYYY-MM-DD)
          if (!groupedByDay[date]) {
            groupedByDay[date] = [];
          }
          groupedByDay[date].push(item);
        });

        // Procesar los datos para agregar temperatura máxima, mínima y otras propiedades
        this.forecast = Object.keys(groupedByDay).map((date) => {
          const items = groupedByDay[date];
          const description = items[0].weather[0].description;
          let iconClass = '';

          // Asignar la clase correspondiente según la descripción del clima
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
            date: new Date(date), // Fecha del día
            tempMax: Math.max(...items.map((i: any) => i.main.temp_max)), // Temp máxima
            tempMin: Math.min(...items.map((i: any) => i.main.temp_min)), // Temp mínima
            description: items[0].weather[0].description, // Descripción del clima
            icon: items[0].weather[0].icon, // Ícono (del primer elemento)
            iconClass: iconClass, // Clase que cambia el color del ícono
          };
        });

        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error al obtener el pronóstico:', err);
        this.errorMessage = 'Error al obtener los datos del pronóstico. Por favor, verifica la ciudad o intenta más tarde.';
      },
    });
  }
}






