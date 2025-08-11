import React from 'react';
import { threeDayForecast } from '../services/weatherMock';
import type { ForecastItem } from '../types/weather';

const ForecastGrid: React.FC = () => {
  const forecast: ForecastItem[] = threeDayForecast;

  return (
    <div className="mt-6">
      <h3 className="text-center text-base font-semibold mb-3 text-blue-200">
        3-Day Forecast (Static)
      </h3>
      <div className="grid grid-cols-3 gap-3 text-center">
        {forecast.map((item) => (
          <div
            key={item.day}
            className="flex flex-col items-center bg-blue-800/50 p-3 rounded-lg hover:bg-blue-800/70 transition"
          >
            <p className="text-sm font-medium">{item.day}</p>
            <p className="text-xl font-bold text-blue-100">{item.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastGrid;
