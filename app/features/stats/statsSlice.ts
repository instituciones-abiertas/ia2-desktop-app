import { createSlice } from '@reduxjs/toolkit';
import { Api } from 'ia2-annotation-tool';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';
import { API } from '../../constants/api';
import { parseHecho, parseEdad, parseLugar } from './helpers';

const api = Api(API);

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    hechos: [],
    hechosTitle: 'Cantidad de Sentencias',
    lugares: [],
    lugaresTitle: 'Sentencias por Lugar',
    edades: [],
    edadesTitle: 'Promedio de edad',
    dateRange: { startDate: '', endDate: '' },
    isLoading: false,
    hasError: false,
    errorCode: null,
    errorMessage: 'Ha ocurrido un error al pedir a las estadísticas',
  },
  reducers: {
    updateErrorStatus: (state, action) => {
      state.hasError = action.payload.status;
      state.isLoading = false;
      state.errorMessage = action.payload.message || state.errorMessage;
      state.errorCode = action.payload.errorCode;
    },
    updateLoader: (state) => {
      state.isLoading = true;
    },
    updateSuccess: (state) => {
      state.hasError = false;
    },
    updateHechoSuccess: (state, action) => {
      state.hechos = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    updateLugarSuccess: (state, action) => {
      state.lugares = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    updateEdadSuccess: (state, action) => {
      state.edades = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    updateDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
  },
});

export const {
  updateLoader,
  updateSuccess,
  updateErrorStatus,
  updateHechoSuccess,
  updateLugarSuccess,
  updateEdadSuccess,
  updateDateRange,
} = statsSlice.actions;

export const getStats = (): AppThunk => async (dispatch, getState) => {
  dispatch(updateLoader());
  const { startDate, endDate } = getState().stats.dateRange;
  try {
    const hechoResponse = await api.getHechoStats(startDate, endDate);
    const lugarResponse = await api.getLugarStats(startDate, endDate);
    const edadResponse = await api.getEdadStats(startDate, endDate);

    const mappedHechoResponse = parseHecho(hechoResponse.data);
    const mappedLugarResponse = parseLugar(lugarResponse.data);
    const mappedEdadResponse = parseEdad(edadResponse.data);

    dispatch(updateHechoSuccess(mappedHechoResponse));
    dispatch(updateLugarSuccess(mappedLugarResponse));
    dispatch(updateEdadSuccess(mappedEdadResponse));
  } catch (err) {
    dispatch(
      updateErrorStatus({
        status: true,
        message:
          err.response && err.response.data && err.response.data.detail
            ? err.response.data.detail
            : 'Error en conversión de estadísticas',
        errorCode:
          err.response && err.response.status ? err.response.status : 400,
      })
    );
  }
};

export default statsSlice.reducer;

export const selectStats = (state: RootState) => state.stats;
