import { useMemo } from 'react';
import type { DailyForecast } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import TemperatureDisplay from './TemperatureDisplay';
import WindDisplay from './WindDisplay';

interface DailyForecastCardProps {
  forecast: DailyForecast;
}

function DailyForecastCard({ forecast }: DailyForecastCardProps) {
  const condition = forecast.weather[0];

  const dayName = useMemo(() => {
    const date = new Date(forecast.dt * 1000);
    return date.toLocaleDateString('pl-PL', { weekday: 'long' });
  }, [forecast.dt]);

  const dateStr = useMemo(() => {
    const date = new Date(forecast.dt * 1000);
    return date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' });
  }, [forecast.dt]);

  const precipitationPercent = useMemo(
    () => Math.round(forecast.pop * 100),
    [forecast.pop]
  );

  return (
    <div className="daily-forecast-card">
      <div className="forecast-day">
        <strong>{dayName}</strong>
        <span>{dateStr}</span>
      </div>
      <WeatherIcon
        icon={condition.icon}
        description={condition.description}
        size="small"
      />
      <div className="forecast-temps">
        <span className="temp-max">
          <TemperatureDisplay celsius={forecast.temp.max} />
        </span>
        <span className="temp-min">
          <TemperatureDisplay celsius={forecast.temp.min} />
        </span>
      </div>
      <div className="forecast-details">
        <div className="forecast-precipitation">
          <span>💧 {precipitationPercent}%</span>
          {forecast.rain && <span>{forecast.rain} mm</span>}
          {forecast.snow && <span>❄️ {forecast.snow} mm</span>}
        </div>
        <div className="forecast-wind">
          <span>💨 <WindDisplay speed={forecast.wind_speed} degrees={forecast.wind_deg} /></span>
        </div>
        <div className="forecast-clouds">
          <span>☁️ {forecast.clouds}%</span>
        </div>
      </div>
    </div>
  );
}

export default DailyForecastCard;
