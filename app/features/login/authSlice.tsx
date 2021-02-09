import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const authState = {
  username: null,
  loggedIn: false,
  hasError: false,
  errorMessage: 'Credenciales incorrectas. Por favor, intenta de nuevo.',
  errorCode: null,
  isAuthenticated: false,
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
      state.isAuthenticated = true;
    },
    errorLogin: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.hasError = true;
      state.errorMessage = action.payload.message;
      state.errorCode = action.payload.errorCode;
    },
    logOutUser: (state) => {
      state.username = null;
      state.isAuthenticated = false;
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
