import axios from 'axios';
import type { City, CityWeather, CurrentWeather, DailyForecast } from '../types/weather';

// OpenWeatherMap API key - get your free key at https://openweathermap.org/api
const API_KEY: string = '40e77cb450a19f4d09f7f986e934c882'; // Replace with your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Default cities to display
export const defaultCities: City[] = [
  { id: 756135, name: 'Warszawa', country: 'PL', lat: 52.2297, lon: 21.0122 },
  { id: 3094802, name: 'Kraków', country: 'PL', lat: 50.0647, lon: 19.945 },
  { id: 3099434, name: 'Gdańsk', country: 'PL', lat: 54.352, lon: 18.6466 },
  { id: 3088171, name: 'Poznań', country: 'PL', lat: 52.4064, lon: 16.9252 },
  { id: 3081368, name: 'Wrocław', country: 'PL', lat: 51.1, lon: 17.0333 },
  { id: 3083829, name: 'Szczecin', country: 'PL', lat: 53.4289, lon: 14.553 },
];

// Check if using real API
export const isUsingRealApi = () => API_KEY !== 'YOUR_API_KEY_HERE';

// Search cities by name
export const searchCities = async (query: string): Promise<City[]> => {
  if (!isUsingRealApi()) {
    // Filter default cities by name for mock mode
    return defaultCities.filter(city =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  const response = await axios.get(`${GEO_URL}/direct`, {
    params: {
      q: query,
      limit: 5,
      appid: API_KEY,
    },
  });

  return response.data.map((item: any, index: number) => ({
    id: item.lat * 1000 + item.lon + index,
    name: item.name,
    country: item.country,
    lat: item.lat,
    lon: item.lon,
  }));
};

// Get weather for a city
export const getWeather = async (city: City): Promise<CityWeather> => {
  if (!isUsingRealApi()) {
    // Return mock data
    return getMockWeather(city);
  }

  try {
    // Fetch current weather and 5-day forecast in parallel
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, {
        params: {
          lat: city.lat,
          lon: city.lon,
          units: 'metric',
          appid: API_KEY,
        },
      }),
      axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat: city.lat,
          lon: city.lon,
          units: 'metric',
          appid: API_KEY,
        },
      }),
    ]);

    const currentData = currentResponse.data;
    const forecastData = forecastResponse.data;

    // Process current weather
    const current: CurrentWeather = {
      temp: currentData.main.temp,
      feels_like: currentData.main.feels_like,
      humidity: currentData.main.humidity,
      pressure: currentData.main.pressure,
      wind_speed: currentData.wind.speed,
      wind_deg: currentData.wind.deg ?? 0,
      clouds: currentData.clouds.all,
      weather: currentData.weather,
    };

    // Process daily forecast - group by day and get one forecast per day
    const dailyMap = new Map<string, DailyForecast>();
    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          dt: item.dt,
          temp: {
            day: item.main.temp,
            min: item.main.temp_min,
            max: item.main.temp_max,
          },
          weather: item.weather,
          pop: item.pop ?? 0,
          rain: item.rain?.['3h'],
          snow: item.snow?.['3h'],
          wind_speed: item.wind.speed,
          wind_deg: item.wind.deg ?? 0,
          clouds: item.clouds.all,
        });
      } else {
        // Update min/max temps for the day
        const existing = dailyMap.get(date)!;
        existing.temp.min = Math.min(existing.temp.min, item.main.temp_min);
        existing.temp.max = Math.max(existing.temp.max, item.main.temp_max);
      }
    });

    const daily: DailyForecast[] = Array.from(dailyMap.values()).slice(0, 5);

    return {
      city,
      current,
      daily,
    };
  } catch (error) {
    console.error(`Failed to fetch weather for ${city.name}:`, error);
    throw error;
  }
};

// Mock weather data for development
const getMockWeather = (city: City): CityWeather => {
  // Generate different weather based on city ID for variety
  const seed = city.id % 6;
  const weatherTypes = [
    { id: 800, main: 'Clear', description: 'bezchmurnie', icon: '01d' },
    { id: 801, main: 'Clouds', description: 'pochmurnie', icon: '03d' },
    { id: 500, main: 'Rain', description: 'lekki deszcz', icon: '10d' },
    { id: 600, main: 'Snow', description: 'lekki śnieg', icon: '13d' },
    { id: 803, main: 'Clouds', description: 'zachmurzenie duże', icon: '04d' },
    { id: 501, main: 'Rain', description: 'umiarkowany deszcz', icon: '10d' },
  ];

  const baseTemp = 5 + seed * 3;
  const weather = weatherTypes[seed];

  const current: CurrentWeather = {
    temp: baseTemp,
    feels_like: baseTemp - 2,
    humidity: 60 + seed * 5,
    pressure: 1010 + seed * 2,
    wind_speed: 3 + seed * 1.5,
    wind_deg: seed * 60,
    clouds: seed * 15,
    weather: [weather],
  };

  const daily: DailyForecast[] = [];
  const now = Math.floor(Date.now() / 1000);

  for (let i = 0; i < 5; i++) {
    const dayWeather = weatherTypes[(seed + i) % 6];
    daily.push({
      dt: now + i * 86400,
      temp: {
        day: baseTemp + i - 2,
        min: baseTemp - 3 + i,
        max: baseTemp + 3 + i,
      },
      weather: [dayWeather],
      pop: (seed + i) % 3 === 0 ? 0.7 : 0.2,
      rain: dayWeather.main === 'Rain' ? 2 + i : undefined,
      snow: dayWeather.main === 'Snow' ? 1 + i : undefined,
      wind_speed: 3 + i,
      wind_deg: (seed * 60 + i * 30) % 360,
      clouds: 20 + i * 10,
    });
  }

  return { city, current, daily };
};
