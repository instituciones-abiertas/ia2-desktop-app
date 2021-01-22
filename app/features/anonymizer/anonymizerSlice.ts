import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';
// eslint-disable-next-line import/no-cycle
import { getAnonymizedDoc, getDocAnalysis } from '../../api/anonymizationApi';
import { IAnnotation } from '../../utils/declarations';

const anonymizerSlice = createSlice({
  name: 'anonymizer',
  initialState: {
    id: 0,
    text: '',
    document: '',
    documentName: '',
    annotations: [],
    newAnnotations: [],
    anonymizedText: '',
    subject: 'PENAL',
    isLoading: false,
    hasError: false,
    errorMessage:
      'En este momento no es posible continuar anonimizando documentos. Vuelva a intentarlo.',
    activeStep: 0,
    resultData: {
      entitiesResult: [{ name: '', value: 0 }],
      risk: 'Medio',
      total: { name: '', value: 0 },
      efectivity_average: 0,
    },
    tags: [
      {
        id: 3,
        name: 'LOC',
        description: 'Es una localización',
        should_anonimyzation: true,
      },
    ],
  },
  reducers: {
    updateAnalysisSuccess: (state, action) => {
      state.text = action.payload.text;
      state.annotations = action.payload.ents;
      state.id = action.payload.id;
      state.isLoading = false;
      state.hasError = false;
    },
    updateAnonymizedDocSuccess: (state, action) => {
      state.anonymizedText = action.payload.anonymous_text;
      state.isLoading = false;
      state.hasError = false;
      state.resultData = action.payload.data_visualization;
    },
    updateDoc: (state, action) => {
      state.document = action.payload;
    },
    updateTags: (state, action) => {
      state.tags = action.payload;
    },
    updateDocName: (state, action) => {
      state.documentName = action.payload;
    },
    updateText: (state, action) => {
      state.text = action.payload;
    },
    updateId: (state, action) => {
      state.id = action.payload;
    },
    updateStep: (state, action) => {
      state.activeStep = action.payload;
    },
    incrementStep: (state) => {
      state.activeStep += 1;
    },
    decrementStep: (state) => {
      state.activeStep -= 1;
    },
    updateAnnotations: (state, action) => {
      state.annotations = action.payload;
    },
    updateNewAnnotations: (state, action) => {
      state.newAnnotations = action.payload;
    },
    updateErrorStatus: (state, action) => {
      state.hasError = action.payload.status;
      state.isLoading = false;
      state.errorMessage = action.payload.message || state.errorMessage;
    },
    updateLoader: (state) => {
      state.isLoading = true;
    },
    updateSuccess: (state) => {
      state.hasError = false;
    },
    updateSubject: (state, action) => {
      state.subject = action.payload;
    },
    clearAnonymizerError: (state) => {
      state.hasError = false;
    },
    updateReset: (state) => {
      state.subject = 'PENAL';
      state.id = 0;
      state.text = '';
      state.document = '';
      state.documentName = '';
      state.annotations = [];
      state.newAnnotations = [];
      state.anonymizedText = '';
      state.isLoading = false;
      state.hasError = false;
      state.errorMessage =
        'En este momento no es posible continuar anonimizando documentos. Vuelva a intentarlo.';
      state.activeStep = 0;
    },
  },
});

export const {
  clearAnonymizerError,
  updateText,
  updateAnnotations,
  updateId,
  updateLoader,
  updateDoc,
  updateSubject,
  updateAnalysisSuccess,
  updateErrorStatus,
  updateAnonymizedDocSuccess,
  updateDocName,
  updateTags,
  updateNewAnnotations,
  updateReset,
  updateStep,
  decrementStep,
  incrementStep,
  updateSuccess,
} = anonymizerSlice.actions;

export const getEntitiesFromDoc = (
  doc: string,
  docName: string
): AppThunk => async (dispatch) => {
  dispatch(updateLoader());
  try {
    const response = await getDocAnalysis(doc, docName);
    dispatch(updateAnalysisSuccess(response));
  } catch (err) {
    dispatch(
      updateErrorStatus({ status: true, message: err.response.data.detail })
    );
  }
};

export const getAnonymization = (
  newAnnotations: IAnnotation[],
  docID: number
): AppThunk => async (dispatch) => {
  dispatch(updateLoader());
  try {
    const response = await getAnonymizedDoc(newAnnotations, docID);
    dispatch(updateAnonymizedDocSuccess(response));
  } catch (err) {
    dispatch(
      updateErrorStatus({ status: true, message: err.response.data.detail })
    );
  }
};

export default anonymizerSlice.reducer;

export const selectAnonymizer = (state: RootState) => state.anonymizer;
