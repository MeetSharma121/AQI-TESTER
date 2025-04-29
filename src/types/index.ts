// Air Quality Data Types
export interface AirQualityData {
  city: string;
  country: string;
  date: string;
  pm25: number;
  pm10: number;
  no2: number;
  o3: number;
  co: number;
  aqi: number;
}

export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

// Air Quality Index Categories
export interface AQICategory {
  level: string;
  range: [number, number];
  color: string;
  description: string;
  healthImplications: string;
}

export type PollutantType = 'pm25' | 'pm10' | 'no2' | 'o3' | 'co';

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }[];
}

export type TimeRange = '24h' | '7d' | '30d' | '90d' | '1y';