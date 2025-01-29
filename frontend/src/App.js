import React, { useState } from 'react';
import Weather from './components/Weather';
import WeatherForecast from './components/WeatherForecast';
import UVIndex from './components/UVIndex';
import AirQuality from './components/AirQuality';
import { Search } from 'lucide-react';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [uvIndexData, setUvIndexData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const weatherRes = await fetch(`http://13.203.90.88/weather/?city=${city}`, {
        
      });
      const uvRes = await fetch(`http://13.203.90.88/uv-index/?city=${city}`);
      const airQualityRes = await fetch(`http://13.203.90.88/air-quality/?city=${city}`);
      const forecastRes = await fetch(`http://13.203.90.88/weather/forecast/?city=${city}`);

      if (!weatherRes.ok || !uvRes.ok || !airQualityRes.ok || !forecastRes.ok) {
        throw new Error('One or more API requests failed');
      }

      const weather = await weatherRes.json();
      const uvIndex = await uvRes.json();
      const airQuality = await airQualityRes.json();
      const forecast = await forecastRes.json();

      setWeatherData(weather);
      setUvIndexData(uvIndex);
      setAirQualityData(airQuality);
      setForecastData(forecast);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data. Please try again.');
      setWeatherData(null);
      setForecastData(null);
      setUvIndexData(null);
      setAirQualityData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city) fetchData();
  };

  const getBackgroundClass = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour <= 18
      ? 'bg-gradient-to-br from-blue-400 to-indigo-600'
      : 'bg-gradient-to-br from-indigo-900 to-slate-900';
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Weather Dashboard</h1>
            <p className="text-blue-100 text-lg">Real-time weather information for any city</p>
          </div>

          {/* Search Section */}
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-blue-100 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                <Search className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            {/* Loading State */}
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto"></div>
                <p className="text-white mt-4">Loading weather data...</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-xl p-6 text-white text-center">
                <p className="text-lg">{error}</p>
              </div>
            )}

            {/* Forecast Section */}
            {forecastData && (
              <div className="backdrop-blur-md rounded-xl border border-white/20 p-1">
                <WeatherForecast data={forecastData} />
              </div>
            )}

            {/* Weather Data */}
            {!loading && !error && weatherData && (
              <div className="grid gap-6">
                {/* Current Weather and UV Index Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="backdrop-blur-md rounded-xl border border-white/20 p-1">
                    <Weather data={weatherData} />
                  </div>
                  {uvIndexData && (
                    <div className="backdrop-blur-md rounded-xl border border-white/20 p-1">
                      <UVIndex data={uvIndexData} />
                    </div>
                  )}
                </div>

                {/* Air Quality Section */}
                {airQualityData && (
                  <div className="backdrop-blur-md rounded-xl border border-white/20 p-1">
                    <AirQuality data={airQualityData} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
