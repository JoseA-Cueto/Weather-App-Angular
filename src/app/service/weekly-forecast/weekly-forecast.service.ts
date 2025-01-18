import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeeklyForecastService {
  private apiUrl = environment.openWeatherApiUrl; // URL base
  private apiKey = environment.openWeatherApiKey; // Clave de la API

  constructor(private http: HttpClient) {}

  getWeeklyForecast(city: string, country: string): Observable<any> {
    const url = `${this.apiUrl}/forecast?q=${city},${country}&units=metric&appid=${this.apiKey}`;
    return this.http.get<any>(url);
  }
  
  
}
