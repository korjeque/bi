export interface HisotryData {
  city?: string;
  temperature: HourTempC[];
}

export interface HourTempC {
  temp_c: number;
  hour: string;
}
