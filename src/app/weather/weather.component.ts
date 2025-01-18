import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';  
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {  
  city: string = '';
  weatherData: any = null;
  errorMessage: string = '';
  cityList: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Inicializar el gráfico
    this.createWeatherChart();
  }

  getWeather(): void {
    if (this.city) {
      const apiKey = environment.openWeatherApiKey;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&units=metric`;
      

      this.http.get(apiUrl).subscribe(
        (data: any) => {
          console.log('Datos obtenidos de la API:', data); // Verifica los datos

          // Guardamos los datos relevantes para mostrarlos en la vista
          this.weatherData = {
            city: data.name,
            description: data.weather[0].description,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            tempMax: data.main.temp_max,
            tempMin: data.main.temp_min,
            windSpeed: data.wind.speed
          };
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error al obtener datos del clima:', error);
          this.weatherData = null;
          this.errorMessage = 'City not found or there was an error with the API.';
        }
      );
    }
  }

  getCities(): void {
    const apiKey = environment.openWeatherApiKey;
    if (this.city.length >= 2) {  // Solo hacer la solicitud si la ciudad tiene al menos 2 caracteres
      const apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${this.city}&type=like&sort=population&cnt=10&appid=${apiKey}`;

      this.http.get(apiUrl).subscribe(
        (data: any) => {
          this.cityList = data.list.map((city: any) => city.name);
        },
        (error) => {
          console.error('Error al obtener las ciudades:', error);
          this.cityList = [];
        }
      );
    } else {
      this.cityList = []; // Si la ciudad tiene menos de 2 caracteres, limpiar las sugerencias
    }
  }

  citySelected(city: string): void {
    this.city = city;  // Actualiza el campo de texto con la ciudad seleccionada
    this.getWeather();  // Llama al método getWeather para obtener los datos del clima de esa ciudad
    this.cityList = [];  // Limpiar la lista de sugerencias después de seleccionar la ciudad
  }

  // Método para crear el gráfico estático (simulación de datos)
  createWeatherChart() {
    const weatherChart = new Chart('weatherChart', {
      type: 'bar',  // Tipo de gráfico
      data: {
        labels: ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'],  // Etiquetas
        datasets: [{
          label: 'Temperature (°C)',  // Leyenda del gráfico
          data: [30, 28, 29, 31, 32],  // Temperaturas estáticas para el gráfico (puedes cambiar estos valores)
          backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Color de las barras
          borderColor: 'rgba(75, 192, 192, 1)',  // Color del borde
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  closeErrorMessage() {
    this.errorMessage = ''; 
  }
}

