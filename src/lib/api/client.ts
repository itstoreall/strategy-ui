import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_STRATEGY_API_URL;

const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default apiClient;
