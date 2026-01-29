// Temperature unit types
export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

// Weather condition
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// Current weather data
export interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_deg: number;
  clouds: number;
  weather: WeatherCondition[];
}

// Daily forecast
export interface DailyForecast {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  weather: WeatherCondition[];
  pop: number; // Probability of precipitation (0-1)
  rain?: number; // Rain volume in mm
  snow?: number; // Snow volume in mm
  wind_speed: number;
  wind_deg: number;
  clouds: number;
}

// City data
export interface City {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

// Full weather data for a city
export interface CityWeather {
  city: City;
  current: CurrentWeather;
  daily: DailyForecast[];
}
