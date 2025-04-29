import { AirQualityData, City } from '../types';

// Sample cities data
export const cities: City[] = [
  { name: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.0060 },
  { name: 'London', country: 'UK', latitude: 51.5074, longitude: -0.1278 },
  { name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522 },
  { name: 'Beijing', country: 'China', latitude: 39.9042, longitude: 116.4074 },
  { name: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503 },
  { name: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090 },
  { name: 'Mumbai', country: 'India', latitude: 19.0760, longitude: 72.8777 },
  { name: 'Los Angeles', country: 'USA', latitude: 34.0522, longitude: -118.2437 },
  { name: 'São Paulo', country: 'Brazil', latitude: -23.5505, longitude: -46.6333 },
  { name: 'Mexico City', country: 'Mexico', latitude: 19.4326, longitude: -99.1332 },
  { name: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357 },
  { name: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093 },
];

// Generate mock historical data for a city
export const generateMockHistoricalData = (city: string, country: string, days: number): AirQualityData[] => {
  const data: AirQualityData[] = [];
  const today = new Date();
  
  // Baseline values with some city-specific variations
  let baselinePm25 = 15;
  let baselinePm10 = 30;
  let baselineNo2 = 25;
  let baselineO3 = 35;
  let baselineCo = 0.8;
  
  // Add some variation based on city name (just for visual diversity in the mock data)
  const cityFirstChar = city.charCodeAt(0);
  baselinePm25 += (cityFirstChar % 20);
  baselinePm10 += (cityFirstChar % 15);
  baselineNo2 += (cityFirstChar % 10);
  
  // Generate data for each day
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (days - i - 1));
    
    // Add some random variation
    const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    const pm25 = Math.max(2, baselinePm25 * randomFactor * (1 + Math.sin(i / 10) * 0.2));
    const pm10 = Math.max(5, baselinePm10 * randomFactor * (1 + Math.sin(i / 8) * 0.15));
    const no2 = Math.max(5, baselineNo2 * randomFactor * (1 + Math.sin(i / 12) * 0.25));
    const o3 = Math.max(10, baselineO3 * randomFactor * (1 + Math.sin(i / 7) * 0.3));
    const co = Math.max(0.2, baselineCo * randomFactor * (1 + Math.sin(i / 9) * 0.1));
    
    // Calculate AQI
    const aqi = Math.round(Math.max(
      pm25 * 4.8,
      pm10 * 2.1,
      no2 * 0.5,
      o3 * 0.3,
      co * 15
    ));
    
    data.push({
      city,
      country,
      date: date.toISOString().split('T')[0],
      pm25,
      pm10,
      no2,
      o3,
      co,
      aqi
    });
  }
  
  return data;
};

// Generate mock current data for all cities
export const generateCurrentData = (): AirQualityData[] => {
  return cities.map(city => {
    // Generate random values
    const pm25 = 5 + Math.random() * 95;
    const pm10 = 10 + Math.random() * 150;
    const no2 = 5 + Math.random() * 75;
    const o3 = 10 + Math.random() * 100;
    const co = 0.2 + Math.random() * 3;
    
    // Calculate AQI
    const aqi = Math.round(Math.max(
      pm25 * 4.8,
      pm10 * 2.1,
      no2 * 0.5,
      o3 * 0.3,
      co * 15
    ));
    
    return {
      city: city.name,
      country: city.country,
      date: new Date().toISOString().split('T')[0],
      pm25,
      pm10,
      no2,
      o3,
      co,
      aqi
    };
  });
};

// Get current data for all cities
export const currentData = generateCurrentData();

// Get top polluted cities
export const getTopPollutedCities = (count: number = 5): AirQualityData[] => {
  return [...currentData].sort((a, b) => b.aqi - a.aqi).slice(0, count);
};

// Get cleanest cities
export const getCleanestCities = (count: number = 5): AirQualityData[] => {
  return [...currentData].sort((a, b) => a.aqi - b.aqi).slice(0, count);
};

// Get historical data for a specific city
export const getHistoricalData = (city: string, days: number = 30): AirQualityData[] => {
  const cityInfo = cities.find(c => c.name === city);
  if (!cityInfo) return [];
  
  return generateMockHistoricalData(city, cityInfo.country, days);
};