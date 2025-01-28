# Weather Dashboard App

## Overview

The Weather Dashboard App provides users with real-time weather data, including:

- **Current Weather**: Displays the current weather conditions (temperature, humidity, wind speed, etc.).
- **Weather Forecast**: Shows a 7-day weather forecast with expected high/low temperatures, precipitation, and weather conditions.
- **Air Quality Index (AQI)**: Displays the current air quality, indicating pollution levels.
- **UV Index**: Provides the current UV index to help users understand sun exposure risks.

## Features

- **Current Weather**: See live updates on temperature, humidity, wind speed, and weather conditions.
- **Weather Forecast**: Access a 7-day forecast for your area.
- **Air Quality Index (AQI)**: Get real-time air quality information for your location (with data on pollutants like PM2.5, PM10, CO, NO2, and Ozone).
- **UV Index**: Learn the current UV index to determine safe sun exposure levels.

## Tech Stack

- **Frontend**: React.js for building a responsive and dynamic interface.
- **Backend**: FastAPI (Python) for handling API calls and serving data.
- **APIs**: 
  - OpenWeather API for weather and UV data.
### Prerequisites

- **Python 3.x** (for the backend)
- **Node.js** (for the frontend)

2. Create a virtual environment:
    ```bash
    python -m venv venv
    ```

3. Activate the virtual environment:
     ```bash
     .\venv\Scripts\activate
     ```
4. Install required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

5. Create a `config.env` file in the root directory of the project and add your API keys:
    ```bash
    WEATHER_API_KEY=your-weather-api-key
    AIR_QUALITY_API_KEY=your-air-quality-api-key
    ```

6. Start the FastAPI backend server:
    ```bash
    uvicorn app.main:app --reload
    ```

   The backend will run on `http://localhost:8000`.

### Frontend Setup (React)

1. Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

   The frontend will run on `http://localhost:3000`.