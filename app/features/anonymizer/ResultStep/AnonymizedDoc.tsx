import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import DownloadIcon from '@material-ui/icons/GetAppSharp';
import { selectAnonymizer } from '../anonymizerSlice';
import {
  getDocToDownload,
  getDocPublished,
  getDocPublishedToDrive,
} from '../../../api/anonymizationApi';
import Loader from '../../../components/Loader/Loader';
import useNotification from '../../notifications/Notification';
import ErrorVisualizer from '../../../components/ErrorVisualizer/ErrorVisualizer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(5),
        '@media (max-width:780px)': { height: theme.spacing(10) },
        '@media (min-width:780px)': { height: theme.spacing(20) },
        '@media (min-width:1024px)': { height: theme.spacing(30) },
        '@media (min-width:1920px)': { height: theme.spacing(60) },
      },
    },
    iconButton: {
      padding: theme.spacing(1),
    },
    button: {
      width: theme.spacing(25),
    },
  })
);

export default function ResultStep() {
  const state = useSelector(selectAnonymizer);
  const [Notification, notifyError, notifySuccess] = useNotification();
  const classes = useStyles();

  const renderAnonymizedDoc = () => {
    return (
      <div className={classes.root}>
        <Paper elevation={6}>
          <div
            style={{
              lineHeight: 1.5,
              whiteSpace: 'pre-line',
              overflowX: 'hidden',
              overflowY: 'scroll',
              backgroundColor: 'white',
              border: 'solid',
              borderColor: '#8a0f4a',
              borderWidth: '0.2em',
              padding: '1.5em',
              height: '100%',
              fontFamily: 'Montserrat',
            }}
          >
            {state.anonymizedText}
          </div>
        </Paper>
      </div>
    );
  };

  const handleDownloadClick = () => {
    try {
      getDocToDownload(state.id, state.documentName);
    } catch (error) {
      notifyError('No se pudo descargar el documento.');
      throw error;
    }
  };

  const handleDropboxPublishButtonClick = () => {
    getDocPublished(state.id)
      .then(() => {
        notifySuccess(
          'Se ha publicado el documento anonimizado en su cuenta de Dropbox.'
        );
        return null;
      })
      .catch((error) => {
        notifyError('No se pudo publicar el documento.');
      });
  };

  const handleDrivePublishButtonClick = () => {
    getDocPublishedToDrive(state.id)
      .then(() => {
        notifySuccess(
          'Se ha publicado el documento anonimizado en su cuenta de Google Drive.'
        );
        return null;
      })
      .catch((error) => {
        notifyError('No se pudo publicar el documento.');
      });
  };

  const renderActionButtons = () => {
    return (
      <Box m={2}>
        <Grid
          container
          direction="row"
          justify="center"
          alignContent="space-around"
          alignItems="center"
          spacing={5}
        >
          <Grid item>
            <Button
              onClick={() => handleDownloadClick()}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Descargar
              <DownloadIcon className={classes.iconButton} fontSize="large" />
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => handleDropboxPublishButtonClick()}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Dropbox
              <ShareIcon className={classes.iconButton} fontSize="large" />
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => handleDrivePublishButtonClick()}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Drive
              <ShareIcon className={classes.iconButton} fontSize="large" />
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  };

  if (state.isLoading) {
    return <Loader />;
  }

  if (state.hasError) {
    return <ErrorVisualizer />;
  }

  return (
    <>
      <Notification />
      {renderAnonymizedDoc()}
      <Box mt={4}>{renderActionButtons()}</Box>
    </>
  );
}
