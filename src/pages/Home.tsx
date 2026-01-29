import { useState, useEffect, useCallback, useMemo } from 'react';
import { defaultCities, getWeather, searchCities } from '../api/weatherApi';
import type { City, CityWeather } from '../types/weather';
import CityCard from '../components/CityCard';
import SearchForm from '../components/SearchForm';

function Home() {
  const [weatherData, setWeatherData] = useState<CityWeather[]>([]);
  const [cities, setCities] = useState<City[]>(defaultCities);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load weather for all cities
  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const promises = cities.map(city => getWeather(city));
        const results = await Promise.all(promises);
        setWeatherData(results);
      } catch (err) {
        setError('Nie udało się załadować danych pogodowych');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [cities]);

  // Handle search
  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    try {
      const results = await searchCities(query);
      if (results.length > 0) {
        setCities(results);
      } else {
        setError('Nie znaleziono miasta');
        setCities(defaultCities);
      }
    } catch (err) {
      setError('Błąd wyszukiwania');
      console.error(err);
    }
  }, []);

  // Reset to default cities
  const handleReset = useCallback(() => {
    setSearchQuery('');
    setCities(defaultCities);
    setError(null);
  }, []);

  // Filter cities by search query locally
  const filteredData = useMemo(() => {
    if (!searchQuery) return weatherData;
    return weatherData.filter(w =>
      w.city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [weatherData, searchQuery]);

  if (loading) {
    return (
      <div className="page">
        <h1>Prognoza Pogody</h1>
        <div className="loading">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Prognoza Pogody</h1>

      <SearchForm onSearch={handleSearch} />

      {searchQuery && (
        <div className="search-info">
          <span>Wyniki dla: "{searchQuery}"</span>
          <button onClick={handleReset} className="reset-button">
            Pokaż wszystkie
          </button>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      <div className="city-grid">
        {filteredData.map(weather => (
          <CityCard key={weather.city.id} weather={weather} />
        ))}
      </div>

      {filteredData.length === 0 && !error && (
        <div className="no-results">Brak wyników</div>
      )}
    </div>
  );
}

export default Home;
