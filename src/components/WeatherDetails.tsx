// File: src/components/WeatherDetails.tsx
import React from 'react';
import type { WeatherData } from '../types/weather';

type Props = {
  weather: WeatherData;
};

const WeatherDetails: React.FC<Props> = ({ weather }) => {
  return (
    <div className="text-center text-white mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-center">
          <img
            src={weather.current.weather_icons[0]}
            alt={weather.current.weather_descriptions[0]}
            className="w-12 h-12"
          />
          <p className="mt-1 font-semibold">
            {weather.current.weather_descriptions[0]}
          </p>
        </div>

        <p className="text-5xl font-bold">{weather.current.temperature}°C</p>

        <div className="text-sm text-blue-200 space-y-1 text-left">
          <p>Wind: {weather.current.wind_speed} kmph</p>
          <p>Precip: {weather.current.precip} mm</p>
          <p>Pressure: {weather.current.pressure} mb</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
