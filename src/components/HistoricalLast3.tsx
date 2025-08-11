import React, { useEffect, useState } from 'react';
import { fetchHistoricalLast3Days } from '../services/weatherApi';
import type { HistoricalResponse, HistoricalDay, WeatherData } from '../types/weather';

type Props = {
  location: string;
  base: WeatherData;                         // to reuse icon + location meta
  onSelect: (w: WeatherData) => void;
};

const HistoricalLast3: React.FC<Props> = ({ location, base, onSelect }) => {
  const [data, setData] = useState<HistoricalResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetchHistoricalLast3Days(location);
        setData(res);
      } catch (e: any) {
        setErr(e?.message || 'Failed to load last 3 days');
      } finally {
        setLoading(false);
      }
    })();
  }, [location]);

  const days: HistoricalDay[] = data
    ? Object.keys(data.historical).sort().map((k) => data.historical[k])
    : [];

  const pickDisplay = (temp: number, label: string): WeatherData => ({
    location: { ...base.location },
    current: {
      ...base.current,
      temperature: temp,
      weather_descriptions: [label],
      weather_icons: base.current.weather_icons,
    },
  });

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
  
  
    return `${day} ${month}`;
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-center text-base font-semibold mb-3 text-blue-200">
        Last 3 Days (Historical)
      </h3>
      {loading && <p className="text-center text-blue-200">Loading…</p>}
      {err && <p className="text-center text-yellow-300">{err}</p>}

      {!loading && !err && days.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {days.map((day) => {
            // Choose a representative hour (noon if present, else first)
            const noon = day.hourly.find((h) => h.time === '1200') ?? day.hourly[0];
            return (
              <button
                key={day.date}
                onClick={() => onSelect(pickDisplay(noon.temperature, `Historical ${formatDate(day.date)}`))}
                className="bg-blue-800/50 rounded-lg p-3 text-center hover:bg-blue-800/70 transition outline-none focus:ring-2 focus:ring-blue-300"
              >
                <p className="text-sm font-semibold mb-2">{formatDate(day.date)}</p>
                <p className="text-xl font-bold">{noon.temperature}°C</p>
                <p className="text-[11px] opacity-80 mt-1">Tap to view</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoricalLast3;
