import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { setTemperatureUnit } from '../store/weatherSlice';
import type { TemperatureUnit } from '../types/weather';

function UnitSelector() {
  const dispatch = useDispatch();
  const currentUnit = useSelector((state: RootState) => state.weather.temperatureUnit);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setTemperatureUnit(e.target.value as TemperatureUnit));
    },
    [dispatch]
  );

  return (
    <div className="unit-selector">
      <label htmlFor="unit-select">Jednostka: </label>
      <select id="unit-select" value={currentUnit} onChange={handleChange}>
        <option value="celsius">Celsjusz (°C)</option>
        <option value="fahrenheit">Fahrenheit (°F)</option>
        <option value="kelvin">Kelvin (K)</option>
      </select>
    </div>
  );
}

export default UnitSelector;
