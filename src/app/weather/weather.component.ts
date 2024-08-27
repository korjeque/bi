import {ChangeDetectionStrategy, Component, OnDestroy, signal} from '@angular/core';
import {WeatherService} from "./services/weather.service";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  finalize,
  Observable,
  Subject,
  switchMap,
  tap
} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, DatePipe, JsonPipe, NgForOf} from "@angular/common";
import {WeatherHistoryComponent} from "./weather-history/weather-history.component";
import {WeatherData} from "./models/data/weather.data";
import {WeatherCurrentComponent} from "./weather-current/weather-current.component";

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  imports: [
    ReactiveFormsModule,
    WeatherHistoryComponent,
    JsonPipe,
    AsyncPipe,
    NgForOf,
    DatePipe,
    WeatherCurrentComponent,
  ],
  providers: [
    WeatherService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent implements OnDestroy {
  public cityControl = new FormControl('');

  loading = signal(false);

  public data$: Observable<WeatherData> = this.cityControl.valueChanges
    .pipe(
      filter(Boolean),
      debounceTime(300),
      distinctUntilChanged(),
      tap(()=>this.loading.set(true)),
      switchMap((search: string)=>{
        return this.weatherService.getCompositeData(search).pipe(
          finalize(()=>{
            this.loading.set(false);
          }),
          catchError(()=>{
            this.loading.set(false);

            return EMPTY;
          }),
        )
      }),
  );

  private destroyed$ = new Subject<void>();
  isLoading(): boolean {
    return this.loading();
  }

  constructor(private weatherService: WeatherService) {
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
