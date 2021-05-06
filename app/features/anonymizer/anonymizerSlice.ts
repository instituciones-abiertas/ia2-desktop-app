import { createSlice } from '@reduxjs/toolkit';
import { Api } from 'ia2-annotation-tool';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';
import { IAnnotation } from '../../utils/declarations';
import styles from './EditionStep/EditionStep.css';
import { API } from '../../constants/api';

const api = Api(API);

const anonymizerSlice = createSlice({
  name: 'anonymizer',
  initialState: {
    id: 0,
    text: '',
    document: '',
    documentName: '',
    annotations: [],
    newAnnotations: [],
    deleteAnnotations: [],
    selectTag: null,
    task_id: null,
    anonymizedText: '',
    subject: 'PENAL',
    isLoading: false,
    hasError: false,
    errorCode: null,
    errorMessage:
      'Ha ocurrido un error procesando el documento. Carga otro documento o intenta más tarde.',
    activeStep: 0,
    resultData: {
      entitiesResult: [
        {
          name: '',
          value: 0,
          model_detect: false,
          human_detect: false,
          percent: '100%',
          ent: 'PER',
        },
      ],
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
      state.task_id = action.payload.task_id;
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
    updateDeleteAnnotations: (state, action) => {
      state.deleteAnnotations = action.payload;
    },
    removeNewAnnotations: (state, action) => {
      state.newAnnotations = state.newAnnotations.filter(
        // Only necessary check start
        (item) => item.start !== action.payload.start
      );
    },
    removeDeleteAnnotations: (state, action) => {
      state.deleteAnnotations = state.deleteAnnotations.filter(
        // Only necessary check start
        (item) => item.start !== action.payload.start
      );
    },

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
      state.deleteAnnotations = [];
      state.anonymizedText = '';
      state.isLoading = false;
      state.hasError = false;
      state.errorCode = null;
      state.errorMessage =
        'Ha ocurrido un error procesando el documento. Carga otro documento o intenta más tarde.';
      state.activeStep = 0;
      state.task_id = null;
    },
    updateSelectTag: (state, action) => {
      state.selectTag = state.tags.find((tag) => tag.name === action.payload);
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
  updateDeleteAnnotations,
  updateReset,
  updateStep,
  decrementStep,
  incrementStep,
  updateSuccess,
  removeDeleteAnnotations,
  removeNewAnnotations,
  updateSelectTag,
} = anonymizerSlice.actions;

export const getEntitiesFromDoc = (
  doc: string,
  docName: string
): AppThunk => async (dispatch) => {
  dispatch(updateLoader());
  try {
    const response = await api.getDocAnalysis(doc, docName);
    const mappedResponse = {
      ...response,
      ents: response.ents.map((ent) => {
        return {
          ...ent,
          class: ent.should_anonymized ? styles.anonymousmark : styles.mark,
        };
      }),
    };
    dispatch(updateAnalysisSuccess(mappedResponse));
  } catch (err) {
    dispatch(
      updateErrorStatus({
        status: true,
        message: err.response.data.detail,
        errorCode: err.response.status,
      })
    );
  }
};

export const getAnonymization = (
  newAnnotations: IAnnotation[],
  docId: number,
  deleteAnnotations: IAnnotation[]
): AppThunk => async (dispatch) => {
  dispatch(updateLoader());
  try {
    const response = await api.getAnonymizedDoc(
      newAnnotations,
      docId,
      deleteAnnotations
    );
    dispatch(updateAnonymizedDocSuccess(response));
  } catch (err) {
    dispatch(
      updateErrorStatus({
        status: true,
        message: err.response.data.detail,
        errorCode: err.response.status,
      })
    );
  }
};

export const getAllOcurrencies = (
  newAnnotations: IAnnotation[],
  docId: number,
  deleteAnnotations: IAnnotation[],
  entityList: number[]
): AppThunk => async (dispatch) => {
  dispatch(updateLoader());
  try {
    const response = await api.getAllOcurrenciesOf(
      newAnnotations,
      docId,
      deleteAnnotations,
      entityList
    );
    const mappedResponse = {
      ...response,
      ents: response.ents.map((ent) => {
        return {
          ...ent,
          class: ent.should_anonymized ? styles.anonymousmark : styles.mark,
        };
      }),
    };
    dispatch(updateAnalysisSuccess(mappedResponse));
  } catch (err) {
    dispatch(
      updateErrorStatus({
        status: true,
        message: err.response.data.detail,
        errorCode: err.response.status,
      })
    );
  }
};

export default anonymizerSlice.reducer;

export const selectAnonymizer = (state: RootState) => state.anonymizer;
