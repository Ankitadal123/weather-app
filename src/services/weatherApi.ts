import { getCache, setCache, isFresh } from "../utils/cache";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const TTL_MS = 5 * 60 * 1000; // 5 minutes for current, tweak as needed

async function fetchJSON(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data?.error) throw new Error(data.error.info || "API error");
  return data;
}

export const fetchCurrentWeather = async (location: string) => {
  const key = `current:${location.toLowerCase()}`;
  const cached = getCache<any>(key);

  // 1) If we have fresh cache → return it immediately
  if (cached && isFresh(cached, TTL_MS)) return cached.v;

  // 2) Kick off a network request
  const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(location)}`;

  if (cached) {
    // 2a) SWR: return stale data now, then revalidate in background
    // Fire and forget revalidation
    fetchJSON(url).then((fresh) => setCache(key, fresh)).catch(() => {});
    return cached.v;
  } else {
    // 2b) No cache → wait for network
    const fresh = await fetchJSON(url);
    setCache(key, fresh);
    return fresh;
  }
};

// Historical: usually can be cached longer since it doesn't change
const HIST_TTL = 24 * 60 * 60 * 1000; // 24h

export const fetchHistoricalLast3Days = async (location: string) => {
  const toISO = (d: Date) => d.toISOString().slice(0, 10);
  const today = new Date();
  const d1 = new Date(today); d1.setDate(today.getDate() - 1);
  const d3 = new Date(today); d3.setDate(today.getDate() - 3);

  const key = `hist3:${location.toLowerCase()}:${toISO(d3)}:${toISO(d1)}`;
  const cached = getCache<any>(key);
  if (cached && isFresh(cached, HIST_TTL)) return cached.v;

  const url = `http://api.weatherstack.com/historical?access_key=${API_KEY}&query=${encodeURIComponent(location)}&historical_date_start=${toISO(d3)}&historical_date_end=${toISO(d1)}&hourly=1`;
  const fresh = await fetchJSON(url);
  setCache(key, fresh);
  return fresh;
};
