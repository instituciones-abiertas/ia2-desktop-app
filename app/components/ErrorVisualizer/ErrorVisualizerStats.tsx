import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import PropTypes from 'prop-types';

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
  })
);

export default function ErrorVisualizer({ errorMessage }) {
  const classes = useStyles();

  return (
    <Box m={16}>
      <Grid
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        justify="center"
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
            <Typography variant="subtitle1">{errorMessage}</Typography>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
}

ErrorVisualizer.propTypes = {
  errorMessage: PropTypes.string,
};

ErrorVisualizer.defaultProps = {
  errorMessage: '',
};
