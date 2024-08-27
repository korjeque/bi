import {inject, Injectable} from '@angular/core';
import {catchError, EMPTY, Observable, of} from "rxjs";
import {Forecast, History} from "../models/api/forecast";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RequestParameter} from "@angular/cli/src/analytics/analytics-parameters";

export const enum WeatherApiConfig {
  key = '82945af918e8480bbfb74726240407'
}

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private baseApiUrl = 'https://api.weatherapi.com/v1/';

  constructor(private http: HttpClient) { }

  public forecast(q: string): Observable<Forecast> {
    const params = new HttpParams()
      .set('key', WeatherApiConfig.key)
      .set('dt', new Date().toISOString().split('T')[0])
      .set('q', q);

    return this.http.get<Forecast>(this.baseApiUrl + 'forecast.json', { params } ).pipe(
      catchError((e)=>{
        return EMPTY;
      })
    );
  }

  public history(q: string): Observable<History> {
    const params = new HttpParams()
      .set('key', WeatherApiConfig.key)
      .set('dt', new Date().toISOString().split('T')[0])
      .set('q', q);

    return this.http.get<History>(this.baseApiUrl + 'history.json', { params } ).pipe(
      catchError((e)=>{
        return EMPTY;
      })
    );
  }
}
