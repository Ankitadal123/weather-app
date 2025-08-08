import { useEffect, useState } from 'react';
import { fetchCurrentWeather } from '../services/weatherApi.ts';
import type { WeatherData } from '../types/weather';

/**
 * Custom React hook to fetch weather data for a given location.
 * @param location - Name of the city or region to fetch weather for.
 * @returns { data, loading } - Weather data and loading state.
 */
export const useWeather = (location: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchCurrentWeather(location);
        if (!isCancelled) {
          setData(response);
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
        if (!isCancelled) {
          setData(null);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup for fast typing or unmount
    return () => {
      isCancelled = true;
    };
  }, [location]);

  return { data, loading };
};
