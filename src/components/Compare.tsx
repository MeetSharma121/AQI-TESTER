import React, { useState, useEffect } from 'react';
import { City, AirQualityData } from '../types';
import AQIGauge from './AQIGauge';
import { ArrowRightIcon, RefreshCwIcon } from 'lucide-react';
import { airQualityAPI } from '../services/airQualityAPI';

const Compare: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [city1, setCity1] = useState<string>('');
  const [city2, setCity2] = useState<string>('');
  const [comparisonData, setComparisonData] = useState<{
    city1Data?: AirQualityData[];
    city2Data?: AirQualityData[];
  }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await airQualityAPI.getCities();
        setCities(citiesData);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  const handleCompare = async () => {
    if (city1 && city2) {
      setLoading(true);
      try {
        const data = await airQualityAPI.compareCities(city1, city2);
        setComparisonData(data);
      } catch (error) {
        console.error('Error comparing cities:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getLatestData = (cityData?: AirQualityData[]) => {
    return cityData?.[cityData.length - 1];
  };

  const calculateAverages = (cityData?: AirQualityData[]) => {
    if (!cityData?.length) return null;
    return {
      pm25: cityData.reduce((sum, d) => sum + d.pm25, 0) / cityData.length,
      pm10: cityData.reduce((sum, d) => sum + d.pm10, 0) / cityData.length,
      no2: cityData.reduce((sum, d) => sum + d.no2, 0) / cityData.length,
      o3: cityData.reduce((sum, d) => sum + d.o3, 0) / cityData.length,
      co: cityData.reduce((sum, d) => sum + d.co, 0) / cityData.length,
      aqi: cityData.reduce((sum, d) => sum + d.aqi, 0) / cityData.length,
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Compare Cities</h2>
        
        <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
          <select
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={city1}
            onChange={(e) => setCity1(e.target.value)}
          >
            <option value="">Select first city</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}, {city.country}
              </option>
            ))}
          </select>
          
          <ArrowRightIcon className="hidden md:block text-gray-400" size={24} />
          
          <select
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
          >
            <option value="">Select second city</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}, {city.country}
              </option>
            ))}
          </select>
          
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            onClick={handleCompare}
            disabled={!city1 || !city2}
          >
            <RefreshCwIcon size={18} />
            Compare
          </button>
        </div>

        {comparisonData.city1Data && comparisonData.city2Data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: city1, data: comparisonData.city1Data },
              { name: city2, data: comparisonData.city2Data }
            ].map((cityInfo, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">{cityInfo.name}</h3>
                
                <div className="flex justify-center mb-6">
                  <AQIGauge value={getLatestData(cityInfo.data)?.aqi || 0} size="lg" />
                </div>
                
                <div className="space-y-4">
                  {['pm25', 'pm10', 'no2', 'o3', 'co'].map((pollutant) => {
                    const avg = calculateAverages(cityInfo.data);
                    return (
                      <div key={pollutant} className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">
                          {pollutant.toUpperCase()}
                        </span>
                        <span className="text-gray-900">
                          {avg ? avg[pollutant as keyof typeof avg].toFixed(2) : 'N/A'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;