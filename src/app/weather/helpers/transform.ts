import {Forecast, History, Hour} from "../models/api/forecast";
import {CurrentData} from "../models/data/current.data";
import {HisotryData} from "../models/data/hisotry.data";

export namespace Transform {
  export  function forecastToCurrent(forecast: Forecast): CurrentData {
    return {
      city: forecast?.location?.name,
      temp_c: forecast.current.temp_c,
      pressure_mb: forecast.current.pressure_mb,
      humidity: forecast.current.humidity,
      cloud: forecast.current.cloud,
    }
  }

  export  function historyToHistoryData(history: History): HisotryData {
    return {
      city: history.location.name,
      temperature: history.forecast.forecastday[0].hour.map((hour: Hour)=> {
        return {
          temp_c: hour.temp_c,
          hour: hour.time,
        }
      }),
    }
  }
}
