import axios from 'axios';
import {
  ACCESS_TOKEN,
  API_BASE_URL,
  AUTH_FORBIDDEN_ERROR,
} from '../constants/api';
// eslint-disable-next-line import/no-cycle
import { refreshToken } from '../features/login/loginApi';

const requester = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

requester.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, Promise.reject);

requester.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status } = error.response;
    const originalRequest = error.config;
    if (
      status === AUTH_FORBIDDEN_ERROR &&
      // eslint-disable-next-line no-underscore-dangle
      !originalRequest._retry
    ) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      await refreshToken();
      return requester(originalRequest);
    }
    throw error;
  }
);

export default requester;
