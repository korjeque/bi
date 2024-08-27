import {CurrentData} from "./current.data";
import {HisotryData} from "./hisotry.data";

export interface WeatherData {
  current: CurrentData;
  history: HisotryData;
}
