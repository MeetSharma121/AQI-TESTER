import { AQICategory, PollutantType } from '../types';

// AQI categories based on US EPA standards
export const aqiCategories: AQICategory[] = [
  {
    level: 'Good',
    range: [0, 50],
    color: '#10B981', // Green
    description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    healthImplications: 'Air quality is considered satisfactory, and air pollution poses little or no risk.'
  },
  {
    level: 'Moderate',
    range: [51, 100],
    color: '#FBBF24', // Yellow
    description: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
    healthImplications: 'Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.'
  },
  {
    level: 'Unhealthy for Sensitive Groups',
    range: [101, 150],
    color: '#F59E0B', // Orange
    description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
    healthImplications: 'Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.'
  },
  {
    level: 'Unhealthy',
    range: [151, 200],
    color: '#EF4444', // Red
    description: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
    healthImplications: 'Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion.'
  },
  {
    level: 'Very Unhealthy',
    range: [201, 300],
    color: '#8B5CF6', // Purple
    description: 'Health alert: The risk of health effects is increased for everyone.',
    healthImplications: 'Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.'
  },
  {
    level: 'Hazardous',
    range: [301, 500],
    color: '#7F1D1D', // Maroon
    description: 'Health warning of emergency conditions: everyone is more likely to be affected.',
    healthImplications: 'Everyone should avoid all outdoor exertion.'
  }
];

// Function to determine AQI category based on AQI value
export const getAQICategory = (aqi: number): AQICategory => {
  const category = aqiCategories.find(
    category => aqi >= category.range[0] && aqi <= category.range[1]
  );
  return category || aqiCategories[aqiCategories.length - 1];
};

// Function to get pollutant description
export const getPollutantDescription = (type: PollutantType): string => {
  const descriptions: Record<PollutantType, string> = {
    pm25: 'Fine particulate matter, 2.5 micrometers or smaller in diameter. Can penetrate deep into lungs and bloodstream.',
    pm10: 'Inhalable particles, 10 micrometers or smaller in diameter. Can affect respiratory system.',
    no2: 'Nitrogen dioxide, a gaseous air pollutant produced by road traffic and other fossil fuel combustion processes.',
    o3: 'Ozone at ground level is a harmful air pollutant and a key ingredient of urban smog.',
    co: 'Carbon monoxide, a colorless, odorless gas that can be harmful when inhaled in large amounts.'
  };
  
  return descriptions[type];
};

// Function to get unit for a pollutant
export const getPollutantUnit = (type: PollutantType): string => {
  const units: Record<PollutantType, string> = {
    pm25: 'μg/m³',
    pm10: 'μg/m³',
    no2: 'ppb',
    o3: 'ppb',
    co: 'ppm'
  };
  
  return units[type];
};

// Function to calculate AQI from pollutant values
// This is a simplified calculation for demonstration
export const calculateAQI = (
  pm25: number,
  pm10: number,
  no2: number,
  o3: number,
  co: number
): number => {
  // Simplified formula - in real-world would use EPA conversion formulas
  const pm25Index = pm25 * 4.8;
  const pm10Index = pm10 * 2.1;
  const no2Index = no2 * 0.5;
  const o3Index = o3 * 0.3;
  const coIndex = co * 15;
  
  // Take max of individual indices
  return Math.round(Math.max(pm25Index, pm10Index, no2Index, o3Index, coIndex));
};

// Format a number with proper units
export const formatPollutantValue = (value: number, type: PollutantType): string => {
  return `${value.toFixed(1)} ${getPollutantUnit(type)}`;
};