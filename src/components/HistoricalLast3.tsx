import React, { useEffect, useState } from 'react';
import { fetchHistoricalLast3Days } from '../services/weatherApi';
import type { HistoricalResponse, HistoricalDay } from '../types/weather';

type Props = { location: string };
const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
  
    // add ordinal suffix
    const suffix =
      day % 10 === 1 && day !== 11 ? 'st' :
      day % 10 === 2 && day !== 12 ? 'nd' :
      day % 10 === 3 && day !== 13 ? 'rd' : 'th';
  
    return `${day}${suffix} ${month}`;
  };
  

const HistoricalLast3: React.FC<Props> = ({ location }) => {
  const [data, setData] = useState<HistoricalResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
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
    };
    load();
  }, [location]);

  const orderedDays = (): HistoricalDay[] => {
    if (!data) return [];
    const keys = Object.keys(data.historical).sort(); // ascending
    return keys.map((k) => data.historical[k]);
  };

  return (
    <div className="mt-8">
      <h3 className="text-center text-base font-semibold mb-3 text-blue-200">
        Last 3 Days (Historical)
      </h3>

      {loading && <p className="text-center text-blue-200">Loading…</p>}
      {err && <p className="text-center text-yellow-300">{err}</p>}

      {!loading && !err && data && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {orderedDays().map((day) => (
            <div key={day.date} className="bg-blue-800/50 rounded-lg p-3">
              <p className="text-sm font-semibold mb-2 text-center">
                {formatDate(day.date)}
               </p>

              <div className="grid grid-cols-2 gap-2 text-center">
                {day.hourly.slice(0, 6).map((h) => (
                  <div key={`${day.date}-${h.time}`} className="bg-blue-900/50 rounded p-2">
                    <p className="text-[11px] opacity-80">{h.time}</p>
                    <p className="text-lg font-bold">{h.temperature}°C</p>
                    <p className="text-[11px] opacity-80">Wind {h.wind_speed} km/h</p>
                    <p className="text-[11px] opacity-80">P {h.pressure} mb</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricalLast3;
