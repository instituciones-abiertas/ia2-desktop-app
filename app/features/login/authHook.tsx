import { useSelector, useDispatch } from 'react-redux';
import { Api } from 'ia2-annotation-tool';
import useClearProcessState from '../../hooks/clearProcessStateHook';
import {
  errorLogin,
  logOutUser,
  selectAuthData,
  successLogin,
} from './authSlice';
import { ACCESS_TOKEN, REFRESH_TOKEN, API } from '../../constants/api';

const api = Api(API);

export function useAuthData() {
  const user = useSelector(selectAuthData);
  return user;
}

export function useLogOut() {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logOutUser());
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  };
  return [logOut];
}

export function useLogin() {
  const [resetState] = useClearProcessState();
  const dispatch = useDispatch();
  const login = (password: string, username: string) =>
    api
      .userLogin(password, username)
      .then((data) => {
        const payload = {
          username,
          token: data.token,
          refreshToken: data.refresh,
        };
        dispatch(successLogin(payload));
        resetState();
        return data;
      })
      .catch((error) => {
        dispatch(
          errorLogin({
            message: 'Credenciales incorrectas. Por favor, intenta de nuevo.',
            errorCode: error.response.status,
          })
        );
        throw error;
      });
  return [login];
}
