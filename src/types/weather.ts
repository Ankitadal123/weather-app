
export interface WeatherData {
  location: { name: string; country: string; localtime: string };
  current: {
    temperature: number;
    weather_descriptions: string[];
    weather_icons: string[];
    wind_speed: number;
    precip: number;
    pressure: number;
  };
}

export interface ForecastItem {
  day: string;   // e.g. "Today", "Tomorrow"
  temp: number;
}

/** Historical types (Weatherstack) */
export interface HistoricalHour {
  time: string;          // "0000", "0300", ...
  temperature: number;
  wind_speed: number;
  precip: number;
  pressure: number;
}

export interface HistoricalDay {
  date: string;
  date_epoch?: number;
  hourly: HistoricalHour[];
}

export interface HistoricalResponse {
  location: { name: string; country: string; localtime?: string };
  historical: Record<string, HistoricalDay>; // key = "YYYY-MM-DD"
}
