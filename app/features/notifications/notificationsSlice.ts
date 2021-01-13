import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    isLoading: false,
    hasError: false,
  },
  reducers: {
    updateLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    updateErrorStatus: (state, action) => {
      state.hasError = action.payload;
    },
  },
});

export const { updateLoader, updateErrorStatus } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const selectNotifications = (state: RootState) => state.notifications;
