import { TestBed } from '@angular/core/testing';
import { WeeklyForecastService } from './weekly-forecast.service';


describe('WeeklyForecastService', () => {
  let service: WeeklyForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
