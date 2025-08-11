// File: src/App.tsx
import React, { useState } from 'react';
import WeatherDetails from './components/WeatherDetails';
import ForecastGrid from './components/ForecastGrid';
import { useWeather } from './hooks/useWeather';
import HistoricalLast3 from './components/HistoricalLast3';
import type { WeatherData } from './types/weather';


function App() {
  const cities = ['Pretoria', 'Cape Town', 'Durban', 'Johannesburg', 'Port Elizabeth'];

const [location, setLocation] = useState<string>('Pretoria');
const { data, loading } = useWeather(location);
const view: 'daily' | 'hourly' = 'daily';


// NEW: selected display override (from clicks)
const [selected, setSelected] = useState<WeatherData | null>(null);

// When a tile is clicked, we set the selected display
const handleSelectDisplay = (w: WeatherData) => setSelected(w);
const clearSelection = () => setSelected(null);

const display = selected ?? data; // what WeatherDetails should show

const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setLocation(e.target.value);
};


  return (
    <div className="min-h-screen bg-[#1b3b50] text-white px-4 py-6 font-sans flex items-center justify-center">
     <div className="w-full max-w-3xl bg-gradient-to-br from-blue-800 to-indigo-900 text-white rounded-xl border border-blue-400 shadow-xl p-6 sm:p-10 transition-all duration-700 ease-in-out transform hover:scale-105">

     <div className="flex items-center justify-center mb-6 gap-3 animate-fade-in-up">

          <img
            src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png"
            alt="weather icon"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase drop-shadow-lg">
          Weather App</h1>
        </div>
        <h2 className="text-center text-xl sm:text-2xl font-semibold mb-6">
          {data?.location.name}, {data?.location.country}
        </h2>
        <select
          className="w-full border border-blue-300 text-white p-3 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 mb-6 bg-transparent placeholder-white appearance-none"
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
      {display && (
        <>
          {/* optional clear pill when a selection is active */}
          {selected && (
            <div className="flex justify-center mb-3">
              <button
                onClick={clearSelection}
                className="text-xs bg-blue-800/60 hover:bg-blue-800 px-3 py-1 rounded"
              >
                Clear selection
              </button>
            </div>
          )}
    <WeatherDetails weather={display} />

{/* pass the base current data so tiles can compose a display payload */}
{view === 'daily' ? (
  <ForecastGrid base={data!} onSelect={handleSelectDisplay} />
) : (
  <p className="text-center text-blue-200">Hourly forecast coming soon…</p>
)}

{/* if you’re rendering last-3-days historical, also pass onSelect */}
{<HistoricalLast3 location={location} base={data!} onSelect={handleSelectDisplay} /> }
          </>
        )}
      </div>
    </div>
  );
}

export default App;
