import { useMemo } from 'react';

interface WeatherIconProps {
  icon: string;
  description: string;
  size?: 'small' | 'medium' | 'large';
}

// Weather icon component using OpenWeatherMap icons
function WeatherIcon({ icon, description, size = 'medium' }: WeatherIconProps) {
  const sizeClass = useMemo(() => {
    switch (size) {
      case 'small': return 'weather-icon-small';
      case 'large': return 'weather-icon-large';
      default: return 'weather-icon-medium';
    }
  }, [size]);

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <img
      src={iconUrl}
      alt={description}
      title={description}
      className={`weather-icon ${sizeClass}`}
    />
  );
}

export default WeatherIcon;
