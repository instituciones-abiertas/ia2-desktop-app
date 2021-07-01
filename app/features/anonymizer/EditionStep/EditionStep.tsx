import React from 'react';
import { Editor } from '@ia2coop/ia2-annotation-tool';
import { useSelector, useDispatch } from 'react-redux';
import ErrorVisualizer from '../../../components/ErrorVisualizer/ErrorVisualizer';
import Loader from '../../../components/Loader/Loader';
import Toast from '../../../components/Toast/Toast';
import {
  selectAnonymizer,
  updateDeleteAnnotations,
  updateNewAnnotations,
  getAllOcurrencies,
} from '../anonymizerSlice';
import { IAnnotation } from '../../../utils/declarations';

// XXX Dont let dispatch re render component Editor no matter if props changed
// eslint-disable-next-line no-unused-vars
const areEqual = () => true;
const MemoEditor = React.memo(Editor, areEqual);
const multipleSelectionEnabe = process.env.MULTIPLE_SELECTION_ENABLE === 'true';

export default function EditionStep() {
  const state = useSelector(selectAnonymizer);
  const dispatch = useDispatch();

  const style = {
    lineHeight: 2,
    fontSize: 'large',
    whiteSpace: 'pre-line',
    overflowX: 'hidden',
    overflowY: 'scroll',
    backgroundColor: 'var(--contrast-color)',
    color: 'var(--secondary-color)',
    borderBottom: 'solid',
    borderColor: 'var(--secondary-color)',
    borderWidth: '0.1em',
    height: '100%',
    padding: '3em',
    fontFamily: 'Saira-Regular',
    zoom: 1,
  };

  if (state.isLoading) {
    return <Loader />;
  }

  if (state.hasError) return <ErrorVisualizer />;

  const onAnnotationsChange = (
    deleteAnnotations: IAnnotation[],
    newAnnotations: IAnnotation[]
  ) => {
    dispatch(updateDeleteAnnotations(deleteAnnotations));
    dispatch(updateNewAnnotations(newAnnotations));
  };

  const onMultipleSelection = (
    newAnnotations: IAnnotation[],
    deleteAnnotations: IAnnotation[],
    tagList: number[]
  ) => {
    dispatch(
      getAllOcurrencies(newAnnotations, state.id, deleteAnnotations, tagList)
    );
  };

  return (
    <>
      {!state.new_act && <Toast message="Se cargo un documento existente" />}
      <MemoEditor
        style={style}
        text={state.text}
        tags={state.tags}
        annotations={state.annotations}
        onAnnotationsChange={onAnnotationsChange}
        multipleSelectionEnable={multipleSelectionEnabe}
        onMultipleSelection={onMultipleSelection}
      />
    </>
  );
}
