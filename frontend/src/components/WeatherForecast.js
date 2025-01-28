import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const WeatherGraph = ({ data }) => {
  const TEMP_THRESHOLD = 25;

  const prepareChartData = () => {
    const timestamps = data.list.map(item => moment(item.dt_txt).format('HH:mm'));
    const tempValues = data.list.map(item => item.main.temp);
    const tempMinValues = data.list.map(item => item.main.temp_min);
    const tempMaxValues = data.list.map(item => item.main.temp_max);

    // Create the dataset for the chart
    return {
      labels: timestamps,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: tempValues,
          fill: true,
          borderColor: 'rgba(75, 192, 192, 1)', // Line color for temperature
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light background for the line
          tension: 0.1, // Smoothing the line curve
        },
        {
          label: 'Min Temperature (°C)',
          data: tempMinValues,
          fill: true,
          borderColor: 'rgba(54, 162, 235, 1)', // Line color for min temperature
          backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue background for the min line
          tension: 0.1,
        },
        {
          label: 'Max Temperature (°C)',
          data: tempMaxValues,
          fill: true,
          borderColor: 'rgba(255, 159, 64, 1)', // Line color for max temperature
          backgroundColor: 'rgba(255, 159, 64, 0.2)', // Light yellow background for the max line
          tension: 0.1,
        },
        // Dynamic coloring based on threshold for temperature
        {
          label: 'Below Threshold',
          data: tempValues.map(temp => (temp < TEMP_THRESHOLD ? temp : null)),
          fill: true,
          borderColor: 'rgba(0, 123, 255, 1)', // Blue color for below threshold
          backgroundColor: 'rgba(0, 123, 255, 0.3)', // Transparent blue fill
          tension: 0.1,
        },
        {
          label: 'Above Threshold',
          data: tempValues.map(temp => (temp >= TEMP_THRESHOLD ? temp : null)),
          fill: true,
          borderColor: 'rgba(255, 193, 7, 1)', // Yellow color for above threshold
          backgroundColor: 'rgba(255, 193, 7, 0.3)', // Transparent yellow fill
          tension: 0.1,
        },
      ],
    };
  };

  // Set up the chart options with black text
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Time',
          color: 'black', // Set the title text color to black
        },
        ticks: {
          color: 'black', // Set the tick text color to black
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Temperature (°C)',
          color: 'black', // Set the title text color to black
        },
        ticks: {
          color: 'black', // Set the tick text color to black
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'black', // Set the legend text color to black
        },
      },
    },
  };

  return (
    <div className="w-full h-80">
      {/* Line graph component */}
      <Line data={prepareChartData()} options={chartOptions} />
    </div>
  );
};

export default WeatherGraph;
