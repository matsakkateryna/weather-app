import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { defaultCities, getWeather } from '../api/weatherApi';
import type { CityWeather } from '../types/weather';
import CityCard from '../components/CityCard';

function Favorites() {
  const favorites = useSelector((state: RootState) => state.weather.favorites);
  const [weatherData, setWeatherData] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);

  // Get favorite cities
  const favoriteCities = useMemo(() => {
    return defaultCities.filter(city => favorites.includes(city.id));
  }, [favorites]);

  // Load weather for favorite cities
  useEffect(() => {
    const loadWeather = async () => {
      if (favoriteCities.length === 0) {
        setWeatherData([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const promises = favoriteCities.map(city => getWeather(city));
        const results = await Promise.all(promises);
        setWeatherData(results);
      } catch (err) {
        console.error('Failed to load weather:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [favoriteCities]);

  if (loading) {
    return (
      <div className="page">
        <h1>Ulubione miasta</h1>
        <div className="loading">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Ulubione miasta</h1>

      {weatherData.length === 0 ? (
        <div className="empty-state">
          <p>Nie masz jeszcze ulubionych miast.</p>
          <p>Kliknij gwiazdkę przy mieście, aby dodać je do ulubionych.</p>
        </div>
      ) : (
        <div className="city-grid">
          {weatherData.map(weather => (
            <CityCard key={weather.city.id} weather={weather} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
