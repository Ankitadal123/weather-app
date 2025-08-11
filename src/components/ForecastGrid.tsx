import React from 'react';
import { threeDayForecast } from '../services/weatherMock';
import type { ForecastItem, WeatherData } from '../types/weather';

type Props = {
  base: WeatherData;                    // current API data (for location, icon, etc.)
  onSelect: (w: WeatherData) => void;   // tell App what to display
};

const ForecastGrid: React.FC<Props> = ({ base, onSelect }) => {
  const forecast: ForecastItem[] = threeDayForecast;

  // Build a WeatherData snapshot from a static tile
  const toDisplay = (item: ForecastItem): WeatherData => ({
    location: { ...base.location },
    current: {
      ...base.current,
      temperature: item.temp,
      weather_descriptions: [`${item.day} forecast`],
      // keep current icon; or swap to your own SVG if you prefer
      weather_icons: base.current.weather_icons,
    },
  });

  return (
    <div className="mt-6">
      <h3 className="text-center text-base font-semibold mb-3 text-blue-200">
        3-Day Forecast (Static)
      </h3>
      <div className="grid grid-cols-3 gap-3 text-center">
        {forecast.map((item) => (
          <button
            key={item.day}
            onClick={() => onSelect(toDisplay(item))}
            className="flex flex-col items-center bg-blue-800/50 p-3 rounded-lg hover:bg-blue-800/70 transition outline-none focus:ring-2 focus:ring-blue-300"
          >
            <p className="text-sm font-medium">{item.day}</p>
            <p className="text-xl font-bold text-blue-100">{item.temp}°C</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ForecastGrid;
