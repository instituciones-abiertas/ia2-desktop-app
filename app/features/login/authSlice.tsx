import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const authState = {
  username: null,
  token: null,
  loggedIn: false,
  hasError: false,
  errorMessage: 'Credenciales incorrectas. Por favor, intenta de nuevo.',
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    successLogin: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    errorLogin: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.errorMessage = action.payload.message;
    },
    logOutUser: (state) => {
      state.username = null;
      state.token = null;
    },
    startLoaderLogin: (state) => {
      state.isLoading = true;
    },
    clearAuthError: (state) => {
      state.hasError = false;
    },
  },
});

export const {
  successLogin,
  logOutUser,
  errorLogin,
  startLoaderLogin,
  clearAuthError,
} = authSlice.actions;

export const selectAuthData = (state: RootState) => state.auth;

export default authSlice.reducer;
