import React from 'react';
import { AirQualityData } from '../types';
import { getAQICategory } from '../utils/airQualityUtils';
import AQIGauge from './AQIGauge';

interface CityCardProps {
  data: AirQualityData;
  onClick?: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ data, onClick }) => {
  const { city, country, aqi, date } = data;
  const category = getAQICategory(aqi);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{city}</h3>
            <p className="text-sm text-gray-600">{country}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">
              {new Date(date).toLocaleDateString(undefined, { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center my-3">
          <AQIGauge value={aqi} size="sm" />
        </div>
        
        <div className="mt-2">
          <div 
            className="text-center py-1 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: `${category.color}20`,
              color: category.color
            }}
          >
            {category.level}
          </div>
          <p className="mt-2 text-xs text-gray-600 line-clamp-2">
            {category.healthImplications}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CityCard;