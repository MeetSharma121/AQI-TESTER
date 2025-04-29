import React from 'react';
import { PollutantType } from '../types';
import { getPollutantDescription, formatPollutantValue } from '../utils/airQualityUtils';

interface PollutantCardProps {
  type: PollutantType;
  value: number;
  trend?: number; // Percentage change
}

const PollutantCard: React.FC<PollutantCardProps> = ({ type, value, trend }) => {
  const displayName = {
    pm25: 'PM2.5',
    pm10: 'PM10',
    no2: 'NO₂',
    o3: 'O₃',
    co: 'CO'
  };

  const description = getPollutantDescription(type);
  const formattedValue = formatPollutantValue(value, type);
  
  // Determine threshold levels (simplified for demonstration)
  let levelColor = 'bg-green-100 text-green-800';
  if (
    (type === 'pm25' && value > 35) ||
    (type === 'pm10' && value > 50) ||
    (type === 'no2' && value > 100) ||
    (type === 'o3' && value > 70) ||
    (type === 'co' && value > 4)
  ) {
    levelColor = 'bg-red-100 text-red-800';
  } else if (
    (type === 'pm25' && value > 12) ||
    (type === 'pm10' && value > 25) ||
    (type === 'no2' && value > 53) ||
    (type === 'o3' && value > 54) ||
    (type === 'co' && value > 2)
  ) {
    levelColor = 'bg-yellow-100 text-yellow-800';
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${levelColor}`}>
          {displayName[type]}
        </h3>
        {trend !== undefined && (
          <span className={`inline-flex items-center text-xs font-medium ${trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold mb-1">{formattedValue}</div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default PollutantCard;