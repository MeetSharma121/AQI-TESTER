import axios from 'axios';
import { AirQualityData, City } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const airQualityAPI = {
  getCities: async (): Promise<City[]> => {
    const response = await axios.get(`${API_BASE_URL}/cities`);
    return response.data;
  },

  getCityData: async (cityName: string): Promise<AirQualityData[]> => {
    const response = await axios.get(`${API_BASE_URL}/city/${encodeURIComponent(cityName)}`);
    return response.data;
  },

  compareCities: async (city1: string, city2: string): Promise<{ city1: AirQualityData[], city2: AirQualityData[] }> => {
    const response = await axios.get(`${API_BASE_URL}/compare`, {
      params: { city1, city2 }
    });
    return response.data;
  },

  getTopPollutedCities: async (): Promise<{ city: string, country: string, avg_aqi: number }[]> => {
    const response = await axios.get(`${API_BASE_URL}/top-polluted`);
    return response.data;
  }
};