import React, { useState } from 'react';
import { AirQualityData, TimeRange } from '../types';
import AQIGauge from './AQIGauge';
import PollutantCard from './PollutantCard';
import { getAQICategory } from '../utils/airQualityUtils';

interface CityDetailProps {
  data: AirQualityData;
  historicalData?: AirQualityData[];
  onTimeRangeChange?: (range: TimeRange) => void;
}

const CityDetail: React.FC<CityDetailProps> = ({ 
  data, 
  historicalData = [],
  onTimeRangeChange 
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const { city, country, aqi, pm25, pm10, no2, o3, co, date } = data;
  const category = getAQICategory(aqi);
  
  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    if (onTimeRangeChange) {
      onTimeRangeChange(range);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{city}</h2>
          <p className="text-gray-600">{country}</p>
          <p className="text-sm text-gray-500">
            Last updated: {new Date(date).toLocaleString()}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <AQIGauge value={aqi} size="lg" />
        </div>
      </div>
      
      <div className="mb-6">
        <div 
          className="p-4 rounded-lg text-sm"
          style={{ 
            backgroundColor: `${category.color}15`,
            color: category.color
          }}
        >
          <h3 className="font-semibold mb-2">Air Quality: {category.level}</h3>
          <p>{category.healthImplications}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Pollutant Levels</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <PollutantCard type="pm25" value={pm25} trend={-5} />
          <PollutantCard type="pm10" value={pm10} trend={2} />
          <PollutantCard type="no2" value={no2} trend={-8} />
          <PollutantCard type="o3" value={o3} trend={12} />
          <PollutantCard type="co" value={co} trend={-3} />
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Historical Trends</h3>
          <div className="flex space-x-2 text-sm">
            {(['24h', '7d', '30d', '90d', '1y'] as TimeRange[]).map((range) => (
              <button
                key={range}
                className={`px-3 py-1 rounded-full transition-colors ${
                  timeRange === range
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handleTimeRangeChange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          {historicalData.length > 0 ? (
            <p className="text-gray-500 italic">Historical chart would go here</p>
          ) : (
            <p className="text-gray-500 italic">No historical data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityDetail;