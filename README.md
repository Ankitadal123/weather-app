# Weather App

A responsive weather application built with React, TypeScript, Tailwind CSS, and Vite, providing current weather and mock 3-day forecast data. Supports dynamic city selection with plans to integrate 7-day real-time forecast using Open-Meteo.

---

## Features

* South African city selector (Pretoria, Cape Town, Durban, etc.)
* Real-time current weather via WeatherStack API
* Modular component architecture with hooks
* Responsive design for mobile & desktop
* Toggle between daily and hourly views
* Custom Tailwind styling with smooth animations



## Tech Stack

* React + TypeScript
* Tailwind CSS for styling
* Vite for fast development
* WeatherStack API (current only)




## Installation

bash
npm install
npm run dev


Make sure to have a `.env` file in the root:

.env
VITE_WEATHER_API_KEY=your_weatherstack_api_key_here



## Project Structure

bash
src/
├── components/         # WeatherDetails, ForecastGrid
├── hooks/              # useWeather
├── services/           # weatherApi, mock data
├── types/              # TypeScript interfaces
├── App.tsx             # Main app logic




## Planned Enhancements

* 7-day forecast using Open-Meteo API
* Geolocation-based city detection
* localStorage for last selected city
* Dark mode toggle
* Unit tests for key components

