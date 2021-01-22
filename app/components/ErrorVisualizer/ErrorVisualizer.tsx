import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import RefreshIcon from '@material-ui/icons/Refresh';
import { AlertTitle } from '@material-ui/lab';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAnonymizer,
  updateReset,
} from '../../features/anonymizer/anonymizerSlice';
import routes from '../../constants/routes.json';

const useStyles = makeStyles((theme) =>
  createStyles({
    alert: {
      fontSize: '1.2em',
      color: theme.palette.primary.dark,
    },
    icon: {
      color: 'white',
    },
    title: {
      fontSize: '1.1em',
      color: theme.palette.primary.dark,
      fontWeight: 'bold',
    },
    margin: {
      marginTop: theme.spacing(20),
    },
    standardError: {
      backgroundColor: theme.palette.secondary.light,
    },
    button: {
      width: theme.spacing(20),
      marginTop: theme.spacing(5),
    },
    iconButton: {
      padding: theme.spacing(1),
    },
  })
);

export default function ErrorVisualizer() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const state = useSelector(selectAnonymizer);

  const handleReset = () => {
    dispatch(updateReset());
  };
  return (
    <Grid
      container
      direction="column"
      className={classes.margin}
      alignContent="center"
      alignItems="center"
    >
      <Grid item>
        <Alert
          severity="error"
          icon={<ErrorIcon fontSize="large" />}
          className={classes.alert}
          classes={{
            standardError: classes.standardError,
            icon: classes.icon,
          }}
        >
          <AlertTitle className={classes.title}>Error</AlertTitle>
          <Typography variant="subtitle1">{state.errorMessage}</Typography>
        </Alert>
      </Grid>
      <Grid item>
        <Link to={routes.ANONIMIZATION}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleReset}
            size="small"
          >
            REINICIAR
            <RefreshIcon className={classes.iconButton} fontSize="small" />
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
