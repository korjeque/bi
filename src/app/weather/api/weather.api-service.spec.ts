import { TestBed } from '@angular/core/testing';

import { WeatherApiService } from './weather.api.service';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('WeatherService', () => {
  let service: WeatherApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(WeatherApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
