import { create } from 'zustand';
import { WeatherDataType } from './../interfaces/WeatherData';

interface WeatherStoreState {
  weatherData: WeatherDataType;
  fetchWeatherData: (data: WeatherDataType) => void;
}

const useWeatherStore = create<WeatherStoreState>((set) => ({
  weatherData: {} as WeatherDataType,
  fetchWeatherData: (data: WeatherDataType) => set({ weatherData: data }),
}));

export { useWeatherStore };
