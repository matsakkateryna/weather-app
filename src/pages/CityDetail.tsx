import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { defaultCities, getWeather } from '../api/weatherApi';
import type { CityWeather } from '../types/weather';
import WeatherIcon from '../components/WeatherIcon';
import TemperatureDisplay from '../components/TemperatureDisplay';
import WindDisplay from '../components/WindDisplay';
import FavoriteButton from '../components/FavoriteButton';
import DailyForecastCard from '../components/DailyForecastCard';

function CityDetail() {
  const { id } = useParams<{ id: string }>();
  const [weather, setWeather] = useState<CityWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Find city by ID
  const city = useMemo(() => {
    const cityId = parseInt(id || '0');
    return defaultCities.find(c => c.id === cityId);
  }, [id]);

  // Load weather data
  useEffect(() => {
    const loadWeather = async () => {
      if (!city) {
        setError('Miasto nie zostało znalezione');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await getWeather(city);
        setWeather(data);
      } catch (err) {
        setError('Nie udało się załadować danych pogodowych');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [city]);

  if (loading) {
    return (
      <div className="page">
        <div className="loading">Ładowanie...</div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="page">
        <div className="error">{error || 'Błąd'}</div>
        <Link to="/" className="back-link">← Powrót do listy</Link>
      </div>
    );
  }

  const { current } = weather;
  const condition = current.weather[0];

  return (
    <div className="page city-detail">
      <Link to="/" className="back-link">← Powrót do listy</Link>

      <div className="city-header">
        <h1>{weather.city.name}, {weather.city.country}</h1>
        <FavoriteButton cityId={weather.city.id} />
      </div>

      {/* Current Weather */}
      <section className="current-weather">
        <h2>Aktualna pogoda</h2>
        <div className="current-weather-main">
          <WeatherIcon
            icon={condition.icon}
            description={condition.description}
            size="large"
          />
          <div className="current-temp">
            <TemperatureDisplay celsius={current.temp} />
          </div>
          <p className="weather-description">{condition.description}</p>
        </div>

        <div className="weather-details-grid">
          <div className="detail-item">
            <span className="detail-label">Odczuwalna</span>
            <span className="detail-value">
              <TemperatureDisplay celsius={current.feels_like} />
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wilgotność</span>
            <span className="detail-value">{current.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Ciśnienie</span>
            <span className="detail-value">{current.pressure} hPa</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wiatr</span>
            <span className="detail-value">
              <WindDisplay speed={current.wind_speed} degrees={current.wind_deg} />
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Zachmurzenie</span>
            <span className="detail-value">{current.clouds}%</span>
          </div>
        </div>
      </section>

      {/* 5-Day Forecast */}
      <section className="daily-forecast">
        <h2>Prognoza na 5 dni</h2>
        <div className="forecast-list">
          {weather.daily.map((day, index) => (
            <DailyForecastCard key={index} forecast={day} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default CityDetail;
