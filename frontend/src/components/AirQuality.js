import React from 'react';

function AirQuality({ data }) {
  const { coord, list } = data;
  const { main, components, dt } = list[0];
  const { aqi } = main;

  // Get background color based on AQI
  const getAQIColor = (aqi) => {
    switch (aqi) {
      case 1: return 'bg-green-100';
      case 2: return 'bg-yellow-100';
      case 3: return 'bg-orange-100';
      case 4: return 'bg-red-100';
      case 5: return 'bg-purple-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className={`${getAQIColor(aqi)} px-6 py-4 border-b border-gray-200`}>
        <h2 className="text-2xl font-bold text-gray-800">Air Quality Index</h2>
        <p className="text-gray-600 mt-1">
          {new Date(dt * 1000).toLocaleDateString()} at {new Date(dt * 1000).toLocaleTimeString()}
        </p>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Location Info */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">📍</span>
            <span className="text-gray-600">
              {coord.lat.toFixed(4)}°, {coord.lon.toFixed(4)}°
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">🌡️</span>
            <span className="text-gray-600">
              AQI: {aqi} - {getAQIRiskLevel(aqi)}
            </span>
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Object.entries(components).map(([key, value]) => (
            <AirQualityCard 
              key={key}
              label={formatLabel(key)}
              value={value.toFixed(2)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const AirQualityCard = ({ label, value }) => (
  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
    <h4 className="text-gray-500 text-sm mb-1">{label}</h4>
    <p className="text-xl font-semibold text-gray-800">{value}</p>
  </div>
);

// Helper function to format component labels
const formatLabel = (key) => {
  const labels = {
    co: 'CO',
    no: 'NO',
    no2: 'NO₂',
    o3: 'O₃',
    so2: 'SO₂',
    pm2_5: 'PM2.5',
    pm10: 'PM10',
    nh3: 'NH₃'
  };
  return labels[key] || key;
};

const getAQIRiskLevel = (aqi) => {
  switch (aqi) {
    case 1: return 'Good';
    case 2: return 'Fair';
    case 3: return 'Moderate';
    case 4: return 'Poor';
    case 5: return 'Very Poor';
    default: return 'Unknown';
  }
};

export default AirQuality;