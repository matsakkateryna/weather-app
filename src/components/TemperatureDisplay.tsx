import { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { TemperatureUnit } from '../types/weather';

interface TemperatureDisplayProps {
  celsius: number;
  showUnit?: boolean;
}

// Convert Celsius to other units
function convertTemperature(celsius: number, unit: TemperatureUnit): number {
  switch (unit) {
    case 'fahrenheit':
      return (celsius * 9) / 5 + 32;
    case 'kelvin':
      return celsius + 273.15;
    default:
      return celsius;
  }
}

// Get unit symbol
function getUnitSymbol(unit: TemperatureUnit): string {
  switch (unit) {
    case 'fahrenheit': return '°F';
    case 'kelvin': return 'K';
    default: return '°C';
  }
}

function TemperatureDisplay({ celsius, showUnit = true }: TemperatureDisplayProps) {
  const unit = useSelector((state: RootState) => state.weather.temperatureUnit);

  const convertTemp = useCallback(
    (temp: number) => convertTemperature(temp, unit),
    [unit]
  );

  const displayValue = useMemo(
    () => Math.round(convertTemp(celsius)),
    [celsius, convertTemp]
  );

  const unitSymbol = useMemo(() => getUnitSymbol(unit), [unit]);

  return (
    <span className="temperature">
      {displayValue}{showUnit && unitSymbol}
    </span>
  );
}

export default TemperatureDisplay;
