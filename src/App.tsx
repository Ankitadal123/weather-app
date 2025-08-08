// File: src/App.tsx
import React, { useState } from 'react';
import WeatherDetails from './components/WeatherDetails';
import ForecastGrid from './components/ForecastGrid';
import { useWeather } from './hooks/useWeather';

function App() {
  const [location, setLocation] = useState<string | null>(null);
  const cities = ['Pretoria', 'Cape Town', 'Durban', 'Johannesburg', 'Port Elizabeth'];
  const { data, loading } = useWeather(location || 'Pretoria');

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };


  return (
    <div className="min-h-screen bg-[#1b3b50] text-white px-4 py-6 font-sans flex items-center justify-center">
      <div className="w-full max-w-3xl bg-blue-900 text-white rounded-lg border border-blue-300 shadow-md p-6 sm:p-8 animate-fade-in transition duration-700 ease-in-out">
        <div className="flex items-center justify-center mb-6 gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png"
            alt="weather icon"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide uppercase">Weather App</h1>
        </div>
        <h2 className="text-center text-xl sm:text-2xl font-semibold mb-6">
          {data?.location.name}, {data?.location.country}
        </h2>
        <select
          className="w-full border border-blue-300 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 mb-6 bg-transparent placeholder-white"
          value={location || 'Pretoria'}
          onChange={handleLocationChange}
        >
          {cities.map((city) => (
            <option key={city} value={city} className="text-black">
              {city}
            </option>
          ))}
        </select>

        {loading && <p className="text-center text-blue-200">Loading...</p>}
        {data && (
          <>
            <WeatherDetails weather={data} />
            <ForecastGrid />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
