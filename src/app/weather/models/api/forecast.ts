export interface Forecast {
  location: Location;
  current: CurrentWeather;
}

export interface History {
  location: Location;
  forecast: HistoryForecast;
}

export interface ForecastDay {
  hour: Hour[];
}

export interface HistoryForecast {
  forecastday: ForecastDay[],
}

export interface CurrentWeather {
  last_updated: string;
  temp_c: number;
  pressure_mb: number;
  humidity: number;
  cloud: number;
}

export interface Location {
  name: string;
}

export interface Hour {
  time: string,
  temp_c: number,
}
