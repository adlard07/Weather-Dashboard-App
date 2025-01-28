import React from 'react';

function Weather({ data }) {
  const { temperature, weather_description, humidity, wind_speed } = data;

  // Get weather icon based on description
  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('clear')) return '☀️';
    if (desc.includes('thunder')) return '⛈️';
    if (desc.includes('fog') || desc.includes('mist')) return '🌫️';
    return '🌤️';
  };

  // Get temperature color
  const getTempColor = (temp) => {
    if (temp < 0) return 'text-blue-600';
    if (temp < 10) return 'text-cyan-600';
    if (temp < 20) return 'text-green-600';
    if (temp < 30) return 'text-orange-600';
    return 'text-red-600';
  };

  const getBackgroundColor = (temp) => {
    if (temp < 0) return 'bg-blue-50';
    if (temp < 10) return 'bg-cyan-50';
    if (temp < 20) return 'bg-green-50';
    if (temp < 30) return 'bg-orange-50';
    return 'bg-red-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className={`${getBackgroundColor(temperature)} px-6 py-4 border-b border-gray-200`}>
        <h2 className="text-2xl font-bold text-gray-800">Current Weather</h2>
        <p className="text-gray-600 mt-1">{weather_description}</p>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Temperature Display */}
        <div className="flex flex-col items-center mb-8">
          <div className="text-6xl mb-2">
            {getWeatherIcon(weather_description)}
          </div>
          <div className={`text-5xl font-bold ${getTempColor(temperature)} mb-2`}>
            {temperature}°C
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <WeatherCard 
            icon="💧" 
            label="Humidity" 
            value={`${humidity}%`}
            description="Relative humidity"
          />
          <WeatherCard 
            icon="💨" 
            label="Wind Speed" 
            value={`${wind_speed} m/s`}
            description="Current wind speed"
          />
        </div>
      </div>
    </div>
  );
}

const WeatherCard = ({ icon, label, value, description }) => (
  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-xl">{icon}</span>
      <h3 className="text-gray-500 text-sm">{label}</h3>
    </div>
    <p className="text-xl font-semibold text-gray-800 mb-1">{value}</p>
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);

export default Weather;