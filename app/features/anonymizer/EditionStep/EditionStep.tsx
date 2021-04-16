import React, { useState } from 'react';
import { Editor } from 'ia2-annotation-tool';
import { useSelector, useDispatch } from 'react-redux';
import ErrorVisualizer from '../../../components/ErrorVisualizer/ErrorVisualizer';
import Loader from '../../../components/Loader/Loader';
import {
  selectAnonymizer,
  updateDeleteAnnotations,
  updateNewAnnotations,
} from '../anonymizerSlice';

// XXX Dont let dispatch re render component Editor no matter if props changed
// eslint-disable-next-line no-unused-vars
const areEqual = (prevProps, nextProps) => true;
const MemoEditor = React.memo(Editor, areEqual);

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

  const onAnnotationsChange = (deleteAnnotations, newAnnotations) => {
    dispatch(updateDeleteAnnotations(deleteAnnotations));
    dispatch(updateNewAnnotations(newAnnotations));
  };

  return (
    <MemoEditor
      style={style}
      text={state.text}
      tags={state.tags}
      annotations={state.annotations}
      onAnnotationsChange={onAnnotationsChange}
    />
  );
}
