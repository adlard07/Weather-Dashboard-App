import React from 'react';

function UVIndex({ data }) {
  const { lat, lon, date_iso, value } = data;

  // Get background color based on UV level
  const getUVBackgroundColor = (value) => {
    if (value < 3) return 'bg-green-100';
    if (value < 6) return 'bg-yellow-100';
    if (value < 8) return 'bg-orange-100';
    if (value < 11) return 'bg-red-100';
    return 'bg-purple-100';
  };

  // Get text color based on UV level
  const getUVTextColor = (value) => {
    if (value < 3) return 'text-green-700';
    if (value < 6) return 'text-yellow-700';
    if (value < 8) return 'text-orange-700';
    if (value < 11) return 'text-red-700';
    return 'text-purple-700';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className={`${getUVBackgroundColor(value)} px-6 py-4 border-b border-gray-200`}>
        <h2 className="text-2xl font-bold text-gray-800">UV Index</h2>
        <p className="text-gray-600 mt-1">
          {new Date(date_iso).toLocaleDateString()} at {new Date(date_iso).toLocaleTimeString()}
        </p>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Location Info */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">📍</span>
            <span className="text-gray-600">
              {lat.toFixed(4)}°, {lon.toFixed(4)}°
            </span>
          </div>
        </div>

        {/* UV Index Display */}
        <div className="flex flex-col items-center mb-6 p-3">
          <div className={`${getUVBackgroundColor(value)} w-24 h-24 rounded-full flex items-center justify-center mb-4`}>
            <span className={`text-4xl font-bold ${getUVTextColor(value)}`}>{value.toFixed(1)}</span>
          </div>
          <div className={`text-lg font-semibold ${getUVTextColor(value)}`}>
            {getUVRiskLevel(value)}
          </div>
        </div>

        {/* Protection Advice */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Protection Advice</h3>
          <p className="text-gray-600">{getProtectionAdvice(value)}</p>
        </div>
      </div>
    </div>
  );
}

// Helper function to determine UV risk level
const getUVRiskLevel = (value) => {
  if (value < 3) return 'Low';
  if (value < 6) return 'Moderate';
  if (value < 8) return 'High';
  if (value < 11) return 'Very High';
  return 'Extreme';
};

// Helper function to get protection advice
const getProtectionAdvice = (value) => {
  if (value < 3) {
    return 'You can safely enjoy being outside. Wear sunglasses on bright days.';
  } else if (value < 6) {
    return 'Take precautions - cover up and wear sunscreen. Stay in shade near midday.';
  } else if (value < 8) {
    return 'Protection required - reduce time in the sun between 11am and 4pm.';
  } else if (value < 11) {
    return 'Extra precautions needed. Avoid being outside during midday hours.';
  }
  return 'Take all precautions - unprotected skin can burn in minutes.';
};

export default UVIndex;
