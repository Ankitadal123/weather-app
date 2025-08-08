// src/services/weatherApi.ts
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

/**
 * Fetch current weather from WeatherStack API
 * @param location - city or region name
 * @returns parsed weather data
 */
export const fetchCurrentWeather = async (location: string) => {
  const res = await fetch(
    `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(location)}`
  );

  if (!res.ok) throw new Error(`API request failed with status ${res.status}`);

  const data = await res.json();
  if (data.error) throw new Error(data.error.info);

  return data;
};
