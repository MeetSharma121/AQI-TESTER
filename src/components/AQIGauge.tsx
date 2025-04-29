import React from 'react';
import { getAQICategory } from '../utils/airQualityUtils';

interface AQIGaugeProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const AQIGauge: React.FC<AQIGaugeProps> = ({ value, size = 'md', showLabel = true }) => {
  const category = getAQICategory(value);
  const { color, level } = category;
  
  // Size classes
  const sizeClasses = {
    sm: { 
      container: 'w-24 h-24',
      value: 'text-2xl',
      label: 'text-xs'
    },
    md: {
      container: 'w-32 h-32',
      value: 'text-3xl',
      label: 'text-sm'
    },
    lg: {
      container: 'w-40 h-40',
      value: 'text-4xl',
      label: 'text-base'
    }
  };
  
  // Calculate the rotation of the needle based on AQI value (0-500 range)
  const rotation = Math.min(180, (value / 500) * 180);
  
  return (
    <div className="flex flex-col items-center">
      <div className={`${sizeClasses[size].container} relative`}>
        {/* Gauge background */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-700 opacity-20"></div>
        </div>
        
        {/* Semi-circle gauge */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '50%' }}>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-500 via-yellow-300 via-orange-500 to-red-800 h-full rounded-t-full"></div>
        </div>
        
        {/* Needle */}
        <div 
          className="absolute bottom-0 left-1/2 w-1 bg-gray-800 origin-bottom transform -translate-x-1/2 transition-transform duration-1000"
          style={{ 
            height: '45%', 
            transformOrigin: 'bottom center',
            transform: `translateX(-50%) rotate(${rotation - 90}deg)` 
          }}
        >
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-gray-800 rounded-full"></div>
        </div>
        
        {/* Center point */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-2 border-gray-800 rounded-full"></div>
        
        {/* Value display */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className={`${sizeClasses[size].value} font-bold`} style={{ color }}>
            {value}
          </div>
          {showLabel && (
            <div className={`${sizeClasses[size].label} text-gray-600 font-medium`}>
              {level}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AQIGauge;