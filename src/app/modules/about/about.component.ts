import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'] 
})
export class AboutComponent {
  
  // Función para el botón "Learn More"
  learnMore(): void {
    alert("This app was built to provide the most accurate weather data and forecasts. Explore its features to know more!");
  }

  // Función para el botón "Visit OpenWeatherMap"
  visitAPI(): void {
    window.open("https://openweathermap.org/", "_blank"); 
  }
}
