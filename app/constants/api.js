export const API_BASE_URL_DEFAULT = 'http://localhost:8000';
export const API_URL_DEFAULT = '/api';

export const API_URL = process.env.BASE_URL
  ? process.env.API_URL
  : API_URL_DEFAULT;

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export const API_BASE_URL = process.env.BASE_URL
  ? process.env.BASE_URL
  : API_BASE_URL_DEFAULT;

export const AUTH_FORBIDDEN_ERROR = 403;

export const AUTH_UNAUTHORIZED_ERROR = 401;
