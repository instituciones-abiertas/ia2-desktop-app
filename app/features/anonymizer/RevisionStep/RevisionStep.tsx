import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextAnnotator } from 'react-text-annotate';
import { Box, Paper } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Span } from 'react-text-annotate/lib/span';
import { selectAnonymizer, updateAnnotations } from '../anonymizerSlice';
import Instructions from '../../../components/Instructions/Instructions';
import Loader from '../../../components/Loader/Loader';
import ErrorVisualizer from '../../../components/ErrorVisualizer/ErrorVisualizer';
import styles from './RevisionStep.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      [theme.breakpoints.up('lg')]: {
        marginRight: theme.spacing(40),
        marginLeft: theme.spacing(40),
      },
      [theme.breakpoints.down('lg')]: {
        marginRight: theme.spacing(20),
        marginLeft: theme.spacing(20),
      },
      [theme.breakpoints.down('md')]: {
        marginRight: theme.spacing(8),
        marginLeft: theme.spacing(8),
      },
    },
    root: {
      '& > *': {
        marginBottom: theme.spacing(5),
        height: theme.spacing(60),
        [theme.breakpoints.down('lg')]: {
          height: theme.spacing(30),
        },
        [theme.breakpoints.down('md')]: {
          height: theme.spacing(30),
        },
        [theme.breakpoints.down('sm')]: {
          height: theme.spacing(28),
        },
      },
    },
  })
);

export default function RevisionStep() {
  const state = useSelector(selectAnonymizer);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleAnnotationsChange = (value: Span[]) => {
    dispatch(updateAnnotations(value));
  };

  const handleDelete = (index: number) => {
    if (index >= 0) {
      dispatch(
        updateAnnotations([
          ...state.annotations.slice(0, index),
          ...state.annotations.slice(index + 1),
        ])
      );
    }
    return null;
  };

  const handleClick = (index: number) => {
    handleDelete(index);
    return null;
  };

  const renderDocAnalysis = () => {
    return (
      <div className={classes.root}>
        <Paper elevation={5}>
          <TextAnnotator
            style={{
              lineHeight: 1.5,
              whiteSpace: 'pre-line',
              overflowX: 'hidden',
              overflowY: 'scroll',
              backgroundColor: 'white',
              color: '#333441',
              border: 'solid',
              borderColor: '#8a0f4a',
              borderWidth: '0.2em',
              height: '100%',
              padding: '1.5em',
              fontFamily: 'Montserrat',
            }}
            content={state.text}
            value={state.annotations}
            onChange={(value: Span[]) => handleAnnotationsChange(value)}
            markClass={styles.mark}
            handleClick={(index) => handleClick(index)}
          />
        </Paper>
      </div>
    );
  };

  const renderInstructions = () => {
    return (
      <Instructions
        title="Se han encontrado las siguientes entidades en el documento."
        subtitle="Elimina las etiquetas sobre las entidades que no deban ser anonimizadas. "
      />
    );
  };

  if (state.isLoading) {
    return <Loader />;
  }

  if (state.hasError) return <ErrorVisualizer />;

  return (
    <Box m={3}>
      <div className={classes.container}>
        {renderInstructions()}
        {renderDocAnalysis()}
      </div>
    </Box>
  );
}
