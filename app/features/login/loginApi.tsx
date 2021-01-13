// eslint-disable-next-line import/no-cycle
import requester from '../../api/requester';

export const userLogin = async (email: string, password: string) => {
  try {
    const response = await requester.post('api-token-auth/login', {
      email,
      password,
    });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response ? response.data : null;
  } catch (error) {
    if (!error.response) {
      throw new Error('Existe un problema de conexión en este momento');
    }
    throw error.response.data;
  }
};

export async function refreshToken() {
  const ENDPOINT_URL = `api-token-refresh/`;
  const oldToken = localStorage.getItem('token');
  try {
    const response = await requester.post(ENDPOINT_URL, {
      token: oldToken,
    });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return Promise.resolve(token);
  } catch (error) {
    if (!error.response) {
      error.response.data.detail =
        'Existe un problema de conexión en este momento. Intente Luego.';
    }
    throw error;
  }
}
