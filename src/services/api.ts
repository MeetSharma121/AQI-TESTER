import axios from 'axios';
import { AirQualityData } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },
};

export const airQualityAPI = {
  getAllCities: async (): Promise<AirQualityData[]> => {
    const response = await api.get('/air-quality/cities');
    return response.data;
  },
  getCityHistory: async (city: string, days: number): Promise<AirQualityData[]> => {
    const response = await api.get(`/air-quality/cities/${city}/history`, {
      params: { days },
    });
    return response.data;
  },
  getMostPolluted: async (limit: number = 10): Promise<AirQualityData[]> => {
    const response = await api.get('/air-quality/most-polluted', {
      params: { limit },
    });
    return response.data;
  },
  getCleanest: async (limit: number = 10): Promise<AirQualityData[]> => {
    const response = await api.get('/air-quality/cleanest', {
      params: { limit },
    });
    return response.data;
  },
};