
# Weather App

A responsive weather application built with React, TypeScript, Tailwind CSS, and Vite. It provides current weather from the WeatherStack API, a static 3-day forecast, and historical weather data for the last 3 days (requires a paid WeatherStack plan). The app also supports interactive selection, allowing users to click on a day’s tile to update the main weather display.


## Features

* City Selector: Choose from popular South African cities (Pretoria, Cape Town, Durban, Johannesburg, Port Elizabeth)
* Current Weather: Real-time data from WeatherStack API
* Static 3-Day Forecast: Shows upcoming days' temperature predictions
* Historical Weather (Last 3 Days): Displays historical data using the paid WeatherStack historical API
* Interactive Selection: Click on any forecast or historical tile to update the main display with that day's data
* Responsive Design: Optimized for both mobile and desktop screens
* Custom Styling: Tailwind CSS-based design with animations for smooth user experience
* Modular Architecture: Organized into reusable components and hooks
* Error Handling: Displays messages when API calls fail or data is unavailable


## Tech Stack

* React + TypeScript
* Tailwind CSS
* Vite
* WeatherStack API (current + historical data)

---

## Installation

bash
npm install
npm run dev


Create a `.env` file in the root directory:

VITE_WEATHER_API_KEY=your_weatherstack_api_key_here


## Project Structure

bash
src/
├── components/         # WeatherDetails, ForecastGrid, HistoricalLast3
├── hooks/              # useWeather
├── services/           # weatherApi, weatherMock
├── types/              # TypeScript interfaces
├── App.tsx             # Main application entry


## Usage

1. Select a city from the dropdown to view its current weather.
2. Switch between Daily and Hourly views using the toggle buttons.
3. In Daily view, click on a 3-day forecast tile to update the main display.
4. Scroll down to view the last 3 days of historical weather data.
5. Click on a historical day’s tile to update the main display.


## Planned Enhancements

* Implement real hourly forecast view
* Integrate geolocation to detect and load the user’s local weather
* Save the last selected city in localStorage for persistent experience
* Add dark mode toggle for improved usability in low-light environments
* Enhance historical data display with min/max temperature and weather condition icons


