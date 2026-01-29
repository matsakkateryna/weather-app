import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TemperatureUnit } from '../types/weather';

// Load initial state from localStorage
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('weatherAppState');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load from localStorage:', e);
  }
  return null;
};

const savedState = loadFromStorage();

interface WeatherState {
  temperatureUnit: TemperatureUnit;
  favorites: number[]; // Array of city IDs
}

const initialState: WeatherState = {
  temperatureUnit: savedState?.temperatureUnit || 'celsius',
  favorites: savedState?.favorites || [],
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload;
      // Save to localStorage
      localStorage.setItem('weatherAppState', JSON.stringify(state));
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const cityId = action.payload;
      const index = state.favorites.indexOf(cityId);
      if (index === -1) {
        state.favorites.push(cityId);
      } else {
        state.favorites.splice(index, 1);
      }
      // Save to localStorage
      localStorage.setItem('weatherAppState', JSON.stringify(state));
    },
  },
});

export const { setTemperatureUnit, toggleFavorite } = weatherSlice.actions;
export default weatherSlice.reducer;
