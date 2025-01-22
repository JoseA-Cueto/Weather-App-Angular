import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class WeeklyForecastService {
  private apiUrl = environment.openWeatherApiUrl; 
  private apiKey = environment.openWeatherApiKey; 

  constructor(private http: HttpClient) {}

  getWeeklyForecast(city: string, country: string): Observable<any> {
    const url = `${this.apiUrl}/forecast?q=${city},${country}&units=metric&appid=${this.apiKey}`;
    return this.http.get<any>(url);
  }
  
  
}
