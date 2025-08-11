// src/services/weatherMock.ts

export const mockForecast = [
    { day: 'Yesterday', temp: 21 },
    { day: 'Today', temp: 23 },
    { day: 'Tomorrow', temp: 25 },
  ];
  
  export const mockHistory = [
    { day: '3 Days Ago', temp: 19 },
    { day: '2 Days Ago', temp: 20 },
    { day: 'Yesterday', temp: 21 },
  ];
  import type { ForecastItem } from '../types/weather';

export const threeDayForecast: ForecastItem[] = [
  { day: 'Today',     temp: 24 },
  { day: 'Tomorrow',  temp: 25 },
  { day: 'Day After', temp: 23 },
];
