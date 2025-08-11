// src/services/weatherApi.ts

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchCurrentWeather = async (location: string) => {
  const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(location)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API request failed: ${res.status}`);
  const data = await res.json();
  if (data?.error) throw new Error(data.error.info || 'WeatherStack error');
  return data;
};

/** Get last 3 days historical: [today-3, today-1] (excludes today) */
export const fetchHistoricalLast3Days = async (location: string) => {
  const toISO = (d: Date) => d.toISOString().slice(0, 10);
  const today = new Date();
  const d1 = new Date(today); d1.setDate(today.getDate() - 1); // yesterday
  const d3 = new Date(today); d3.setDate(today.getDate() - 3); // 3 days ago

  const url =
    `http://api.weatherstack.com/historical` +
    `?access_key=${API_KEY}` +
    `&query=${encodeURIComponent(location)}` +
    `&historical_date_start=${toISO(d3)}` +
    `&historical_date_end=${toISO(d1)}` +
    `&hourly=1`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Historical API failed: ${res.status}`);
  const data = await res.json();
  if (data?.error) throw new Error(data.error.info || 'Historical error');
  return data; // HistoricalResponse
};
