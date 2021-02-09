// eslint-disable-next-line import/no-cycle
import requester from '../../api/requester';
import { API_URL, ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/api';

export const userLogin = async (email: string, password: string) => {
  try {
    const response = await requester.post(`${API_URL}/token/`, {
      email,
      password,
    });
    const { access, refresh } = response.data;
    localStorage.setItem(ACCESS_TOKEN, access);
    localStorage.setItem(REFRESH_TOKEN, refresh);
    return response ? response.data : null;
  } catch (error) {
    if (!error.response) {
      throw new Error('Existe un problema de conexión en este momento');
    }
    throw error.response.data;
  }
};

export const logoutUser = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export async function refreshToken() {
  const ENDPOINT_URL = `${API_URL}/token/refresh/`;
  try {
    const response = await requester.post(ENDPOINT_URL, {
      refresh: localStorage.getItem(REFRESH_TOKEN),
    });
    const { access } = response.data;
    localStorage.setItem(ACCESS_TOKEN, access);
    return Promise.resolve(access);
  } catch (error) {
    if (!error.response) {
      error.response.data.detail =
        'Existe un problema de conexión en este momento. Intente Luego.';
    }
    return Promise.reject(error);
  }
}
