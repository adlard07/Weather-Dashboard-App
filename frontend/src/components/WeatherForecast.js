import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherGraph = ({ data }) => {
  const TEMP_THRESHOLD = 25;

  const prepareChartData = () => {
    const timestamps = data.list.map(item => moment(item.dt_txt).format('HH:mm'));
    const tempValues = data.list.map(item => item.main.temp);
    const tempMinValues = data.list.map(item => item.main.temp_min);
    const tempMaxValues = data.list.map(item => item.main.temp_max);

    return {
      labels: timestamps,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: tempValues,
          fill: true,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
        },
        {
          label: 'Min Temperature (°C)',
          data: tempMinValues,
          fill: true,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.1,
        },
        {
          label: 'Max Temperature (°C)',
          data: tempMaxValues,
          fill: true,
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          tension: 0.1,
        },
        {
          label: 'Below Threshold',
          data: tempValues.map(temp => (temp < TEMP_THRESHOLD ? temp : null)),
          fill: true,
          borderColor: 'rgba(0, 123, 255, 1)',
          backgroundColor: 'rgba(0, 123, 255, 0.3)',
          tension: 0.1,
        },
        {
          label: 'Above Threshold',
          data: tempValues.map(temp => (temp >= TEMP_THRESHOLD ? temp : null)),
          fill: true,
          borderColor: 'rgba(255, 193, 7, 1)',
          backgroundColor: 'rgba(255, 193, 7, 0.3)',
          tension: 0.1,
        },
      ],
    };
  };

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
    layout: {
      padding: 10, // Add padding for better visualization
    },
    plugins: {
      background: {
        color: '#f8f9fa', // Set off-white background color
      },
    },
  };

  return (
    <div className="w-full h-80" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '16px' }}>
      {/* Line graph component */}
      <Line data={prepareChartData()} options={chartOptions} />
    </div>
  );
}

export default WeatherGraph;
