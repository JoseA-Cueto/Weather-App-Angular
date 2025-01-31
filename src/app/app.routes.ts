import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { WeeklyForecastComponent } from './modules/weekly-forecast/weekly-forecast.component';
import { AboutComponent } from './modules/about/about.component';
import { WeatherComponent } from './modules/weather/weather.component'; 

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirigir a "Home"
  { path: 'home', component: HomeComponent }, // Página principal
  { path: 'current-weather', component: WeatherComponent }, // Clima actual
  { path: 'weekly-forecast', component: WeeklyForecastComponent }, // Pronóstico semanal
  { path: 'about', component: AboutComponent }, // Acerca de la app
];

