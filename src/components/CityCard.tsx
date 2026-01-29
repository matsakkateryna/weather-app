import { Link } from 'react-router-dom';
import type { CityWeather } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import TemperatureDisplay from './TemperatureDisplay';
import FavoriteButton from './FavoriteButton';

interface CityCardProps {
  weather: CityWeather;
}

function CityCard({ weather }: CityCardProps) {
  const { city, current } = weather;
  const condition = current.weather[0];

  return (
    <Link to={`/city/${city.id}`} className="city-card">
      <div className="city-card-header">
        <h3>{city.name}, {city.country}</h3>
        <FavoriteButton cityId={city.id} />
      </div>
      <div className="city-card-content">
        <WeatherIcon
          icon={condition.icon}
          description={condition.description}
          size="medium"
        />
        <div className="city-card-temp">
          <TemperatureDisplay celsius={current.temp} />
        </div>
        <p className="city-card-description">{condition.description}</p>
      </div>
    </Link>
  );
}

export default CityCard;
