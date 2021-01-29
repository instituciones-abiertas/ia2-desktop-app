import { saveAs } from 'file-saver';
// eslint-disable-next-line import/no-cycle
import requester from './requester';
import {
  IDocAnalysis,
  ISubject,
  IEntity,
  IAnnotation,
} from '../utils/declarations';

const API_URL = process.env.BASE_URL ? process.env.API_URL : API_URL_DEFAULT;

export async function getAnonymizedDoc(
  newAnnotations: IAnnotation[],
  docId: number
) {
  const ENDPOINT_URL = `${API_URL}/act/${docId}/addAnnotations/`;
  const params = { ents: newAnnotations };
  try {
    const response = await requester.post<IDocAnalysis>(ENDPOINT_URL, params);
    return response.data;
  } catch (error) {
    if (!error.response) {
      error.response.data.detail =
        'Existe un problema de conexión en este momento. Intente Luego.';
    }
    throw error;
  }
}

const blobToFile = (theBlob: Blob, fileName: string): File => {
  return new File([theBlob], fileName, {
    lastModified: new Date().getTime(),
    type: theBlob.type,
  });
};

export async function getDocAnalysis(doc: string, docName: string) {
  const ENDPOINT_URL = `${API_URL}/act/`;
  const formData = new FormData();
  const blob = await fetch(doc).then((r) => r.blob());
  const file = blobToFile(blob, docName);
  formData.append('file', file);
  try {
    const response = await requester.post<IDocAnalysis>(ENDPOINT_URL, formData);
    return response ? response.data : null;
  } catch (error) {
    if (!error.response) {
      error.response.data.detail =
        'Existe un problema de conexión en este momento. Intente Luego.';
    }
    throw error;
  }
}

export async function getSubjects() {
  const ENDPOINT_URL = `subject/`;
  try {
    const data = await requester.get<ISubject[]>(ENDPOINT_URL);
    return data.data;
  } catch (error) {
    if (!error.response) {
      error.response.data.detail =
        'Existe un problema de conexión en este momento. Intente Luego.';
    }
    throw error;
  }
}

export async function selectSubject(idSubject: number) {
  const ENDPOINT_URL = `${API_URL}/subject/${idSubject}/useSubject/`;
  try {
    const { data } = await requester.post(ENDPOINT_URL);
    return {
      data,
    };
  } catch (error) {
    if (!error.response) {
      error.response.data.detail =
        'Existe un problema de conexión en este momento. Intente Luego.';
    }
    throw error;
  }
}

export async function getEntities() {
  const ENDPOINT_URL = `${API_URL}/entity/`;
  try {
    const data = await requester.get<IEntity[]>(ENDPOINT_URL);
    return data.data;
  } catch (error) {
    if (!error.response) {
      error.response.data.detail =
        'Existe un problema de conexión en este momento. Intente Luego.';
    }
    throw error;
  }
}

export async function getDocToDownload(docId: number, fileName: string) {
  const ENDPOINT_URL = `${API_URL}/act/${docId}/getAnonymousDocument/`;
  try {
    const response = await requester.get(ENDPOINT_URL, {
      responseType: 'blob',
    });
    saveAs(response.data, fileName);
  } catch (error) {
    if (!error.response) {
      error.response.data.detail =
        'Existe un problema de conexión en este momento. Intente Luego.';
    }
    throw error;
  }
}

export async function getDocPublishedToDrive(docId: number) {
  const ENDPOINT_URL = `${API_URL}/act/${docId}/publishDocumentInDrive/`;
  try {
    const data = await requester.post(ENDPOINT_URL);
    return data;
  } catch (error) {
    if (!error.response) {
      error.response.data.detail =
        'Existe un problema de conexión en este momento. Intente Luego.';
    }
    throw error;
  }
}

export async function getDocPublished(docId: number) {
  const ENDPOINT_URL = `${API_URL}/act/${docId}/publishDocument/`;
  try {
    const data = await requester.post(ENDPOINT_URL);
    return data;
  } catch (error) {
    if (!error.response) {
      error.response.data.detail =
        'Existe un problema de conexión en este momento. Intente Luego.';
    }
    throw error;
  }
}
