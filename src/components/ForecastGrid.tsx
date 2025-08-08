// File: src/components/ForecastGrid.tsx
import React from 'react';
import type { ForecastItem } from '../types/forecast';
import { mockForecast } from '../services/weatherMock';

const ForecastGrid: React.FC = () => {
  const forecast: ForecastItem[] = mockForecast;

  return (
    <div className="grid grid-cols-5 gap-2 text-center text-white text-sm">
      {forecast.map((item) => (
        <div
          key={item.day}
          className="flex flex-col items-center bg-#1b3b50 bg-opacity-50 p-2 rounded-lg"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/1163/1163661.png"
            alt="Weather icon"
            className="w-6 h-6 mb-1"
          />
          <p className="font-medium">{item.day.slice(0, 3)}</p>
          <p>{item.temp}°C</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastGrid;
