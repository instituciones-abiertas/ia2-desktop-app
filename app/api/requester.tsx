import axios from 'axios';
import { API_BASE_URL_DEFAULT } from '../constants/api';
// eslint-disable-next-line import/no-cycle
import { refreshToken } from '../features/login/loginApi';

const API_BASE_URL = process.env.BASE_URL
  ? process.env.BASE_URL
  : API_BASE_URL_DEFAULT;

const requester = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

requester.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, Promise.reject);

requester.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // eslint-disable-next-line no-underscore-dangle
    if (error.response.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      await refreshToken();
      return requester(originalRequest);
    }
    throw error;
  }
);

export default requester;
