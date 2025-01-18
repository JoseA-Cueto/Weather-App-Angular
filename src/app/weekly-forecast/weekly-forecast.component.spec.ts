import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyForecastComponent } from './weekly-forecast.component';

describe('WeeklyForecastComponent', () => {
  let component: WeeklyForecastComponent;
  let fixture: ComponentFixture<WeeklyForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyForecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
