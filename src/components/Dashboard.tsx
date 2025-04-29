import React, { useState } from 'react';
import { AirQualityData } from '../types';
import CityCard from './CityCard';
import CityDetail from './CityDetail';
import { getTopPollutedCities, getCleanestCities, getHistoricalData } from '../data/mockData';
import { MapIcon, TrendingUpIcon, AlertTriangleIcon, LeafIcon } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<AirQualityData | null>(null);
  const [historicalData, setHistoricalData] = useState<AirQualityData[]>([]);
  
  const topPollutedCities = getTopPollutedCities(4);
  const cleanestCities = getCleanestCities(4);
  
  const handleCitySelect = (city: AirQualityData) => {
    setSelectedCity(city);
    const cityHistory = getHistoricalData(city.city, 30);
    setHistoricalData(cityHistory);
  };
  
  const stats = [
    {
      icon: <MapIcon className="w-8 h-8 text-blue-500" />,
      title: "Cities Monitored",
      value: "500+",
      description: "Real-time monitoring across global cities"
    },
    {
      icon: <TrendingUpIcon className="w-8 h-8 text-green-500" />,
      title: "Data Points",
      value: "1M+",
      description: "Daily air quality measurements"
    },
    {
      icon: <AlertTriangleIcon className="w-8 h-8 text-yellow-500" />,
      title: "Alerts Issued",
      value: "1,234",
      description: "Health warnings this month"
    },
    {
      icon: <LeafIcon className="w-8 h-8 text-emerald-500" />,
      title: "Green Cities",
      value: "50+",
      description: "Cities with excellent air quality"
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              {stat.icon}
              <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{stat.title}</h3>
            <p className="text-sm text-gray-600">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {selectedCity ? (
            <CityDetail 
              data={selectedCity} 
              historicalData={historicalData}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center py-12">
                <MapIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to AQITESTER</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Monitor real-time air quality data from cities worldwide. Select a city to view detailed information and historical trends.
                </p>
              </div>
            </div>
          )}
          
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Global Air Quality Overview</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="aspect-w-16 aspect-h-9 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 italic">Interactive global air quality map</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Most Polluted Cities</h2>
            <div className="space-y-4">
              {topPollutedCities.map((city) => (
                <CityCard 
                  key={city.city} 
                  data={city} 
                  onClick={() => handleCitySelect(city)}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Cleanest Air Cities</h2>
            <div className="space-y-4">
              {cleanestCities.map((city) => (
                <CityCard 
                  key={city.city} 
                  data={city} 
                  onClick={() => handleCitySelect(city)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;