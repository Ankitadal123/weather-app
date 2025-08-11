
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
* Instant reloads (within TTL) thanks to cached responses
* Freshness preserved via background revalidation
* Less API usage (especially for historical)
* Better UX by remembering the user’s last city


## Tech Stack

* React + TypeScript
* Tailwind CSS
* Vite
* WeatherStack API (current + historical data)

---

## Setup & Run (Clear Instructions)

 Prerequisites

* Node.js 18+ and npm 9+
* A WeatherStack API key (paid plan required for historical data)

 1) Clone and install

```bash
# clone your repo
git clone https://github.com/<your-user>/<your-repo>.git
cd <your-repo>

# install deps
npm install
```

 2) Environment variables

Create a `.env` file in the project root:

```env
VITE_WEATHER_API_KEY=your_weatherstack_api_key_here
```

3) Start the dev server

bash
npm run dev


Vite prints a local URL (usually `http://localhost:5173`). Open it in your browser.

4) Build & preview production

bash
npm run build
npm run preview

* Troubleshooting

* If the page shows no data, open the **DevTools Console** and Network tab:

* Verify requests to `api.weatherstack.com` and check for any `error` payloads.
* Free plans don’t include historical—upgrade or disable historical view for testing.
* Ensure the `.env` key is loaded (restart `npm run dev` after editing `.env`).
* If serving the app over **HTTPS**, WeatherStack (HTTP) may be blocked by the browser. Use a proxy/serverless function or host the site over HTTP during development.

* Design Decisions & Trade‑offs (Brief)

* Vite + React + TypeScript: Fast DX, type safety, and simple build tooling. Trade‑off: adds a build step vs. plain HTML/CSS/JS but pays off in maintainability.
* Tailwind CSS: Utility‑first styling for speed and consistency. Trade‑off: classes in markup can get verbose—mitigated by component extraction.
* WeatherStack API: Simple current weather, with a paid historical endpoint that meets project needs. Trade‑off: free tier doesn’t include historical/forecast; we provide a static 3‑day forecast for UI and use historical only when a paid key is present.
* Static 3‑Day Forecast: Chosen for predictability and to satisfy the spec without incurring third‑party complexity. Trade‑off: not real data; clearly labeled as static.
* Local Caching (SWR): localStorage cache returns instantly if fresh, then revalidates in the background. Trade‑off: slightly more logic in the service layer, but reduces API calls and speeds up repeat visits.
* State Management: Kept minimal with React state + custom hooks (no Redux/Zustand) to keep code lightweight. Trade‑off: fine for this scope; larger apps might benefit from a store.
* Accessibility & Responsiveness: Semantic buttons for interactive tiles, focus rings, responsive grids; trade‑off: more utility classes but better UX.
* Animations: Subtle Tailwind keyframes (fade/pulse) to enhance perceived performance; trade‑off: keep effects lightweight to avoid layout jank.


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


