import {TestBed} from '@angular/core/testing';
import {WeatherService} from './weather.service';
import {WeatherApiService} from "../api/weather.api.service";

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ WeatherApiService ]
    });
    service = TestBed.inject(
      WeatherService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
