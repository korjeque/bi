import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {AsyncPipe, DatePipe, DOCUMENT, NgForOf} from "@angular/common";
import {HisotryData, HourTempC} from "../models/data/hisotry.data";
import {HourPipe} from "./hour.pipe";
import * as echarts from "echarts";

export interface Series {
  name: string,
  type: string,
  stack: string,
  areaStyle: {
    normal: {}
  },
  data: number;
}

@Component({
  selector: 'app-weather-history',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    NgForOf,
    HourPipe
  ],
  templateUrl: './weather-history.component.html',
  styleUrl: './weather-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherHistoryComponent implements AfterViewInit {
  @Input()
  public historyData!: HisotryData;
  public series: Series[] = [];
  public legends: string[] = []

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit() {

    const stackchart: echarts.ECharts = echarts.init(this.document?.getElementById('mGraph'));

    stackchart.setOption({
      title: {
        text: this.historyData.city,
      },
      tooltip: {},
      legend: {
        data: ['&deg;C']
      },
      xAxis: {
        data: [...this.historyData.temperature.map(
          (data: HourTempC)=> data.hour
        )]
      },
      yAxis: {},
      series: [
        {
          name: 'Температура по часам',
          type: 'bar',
          data: this.historyData.temperature.map((temp)=> temp.temp_c)
        }
      ]
    });
  }
}
