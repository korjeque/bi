import {Component, Input} from '@angular/core';
import {CurrentWeather} from "../models/api/forecast";
import {AsyncPipe} from "@angular/common";
import {CurrentData} from "../models/data/current.data";

@Component({
  selector: 'app-weather-current',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './weather-current.component.html',
  styleUrl: './weather-current.component.scss'
})
export class WeatherCurrentComponent {
  @Input()
  current!: CurrentData;
}
