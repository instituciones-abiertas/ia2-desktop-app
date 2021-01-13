import { useSelector, useDispatch } from 'react-redux';
import useClearProcessState from '../../hooks/clearProcessStateHook';
import {
  errorLogin,
  logOutUser,
  selectAuthData,
  successLogin,
} from './authSlice';
import { userLogin } from './loginApi';

export function useAuthData() {
  const user = useSelector(selectAuthData);
  return user;
}

export function useLogOut() {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logOutUser());
    localStorage.removeItem('token');
  };
  return [logOut];
}

export function useLogin() {
  const [resetState] = useClearProcessState();
  const dispatch = useDispatch();
  const login = (password: string, username: string) =>
    userLogin(password, username)
      .then((data) => {
        const payload = { username, token: data.token };
        dispatch(successLogin(payload));
        resetState();
        return data;
      })
      .catch((error) => {
        dispatch(
          errorLogin({
            message: 'Credenciales incorrectas. Por favor, intenta de nuevo.',
          })
        );
        throw error;
      });
  return [login];
}
