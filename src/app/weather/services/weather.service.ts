import {inject, Injectable} from '@angular/core';
import {WeatherApiService} from "../api/weather.api.service";
import {combineLatest, map, Observable} from "rxjs";
import {CurrentData} from "../models/data/current.data";
import {Transform} from "../helpers/transform";
import {HisotryData} from "../models/data/hisotry.data";
import {WeatherData} from "../models/data/weather.data";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private api: WeatherApiService) {
  }

  getCurrent(cityName: string): Observable<CurrentData> {
    return this.api.forecast(cityName).pipe(
      map(Transform.forecastToCurrent),
    )
  }

  getHistoryByHours(cityName: string): Observable<HisotryData> {
    return this.api.history(cityName).pipe(
      map(Transform.historyToHistoryData),
    )
  }

  getCompositeData(search: string): Observable<WeatherData> {
    return combineLatest([
      this.getCurrent(search),
      this.getHistoryByHours(search)]
    )
      .pipe(
        map(([current, history])=>
        {
          return { current, history};
        }
      ),
    );
  }
}
