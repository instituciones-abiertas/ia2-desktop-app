import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { useHistory } from 'react-router';
import ShareIcon from '@material-ui/icons/Share';
import DownloadIcon from '@material-ui/icons/GetAppSharp';
import RefreshIcon from '@material-ui/icons/Refresh';
import { selectAnonymizer, updateReset } from '../anonymizerSlice';
import {
  getDocToDownload,
  getDocPublished,
  getDocPublishedToDrive,
} from '../../../api/anonymizationApi';
import Loader from '../../../components/Loader/Loader';
import useNotification from '../../notifications/Notification';
import ErrorVisualizer from '../../../components/ErrorVisualizer/ErrorVisualizer';
import Results from '../../../components/Result/Results';
import routes from '../../../constants/routes.json';
import PopUpReset from '../../../components/ErrorVisualizer/PopUpReset';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    results: {
      minWidth: '300px',
      margin: theme.spacing(5, 60),
      [theme.breakpoints.down('lg')]: {
        margin: theme.spacing(1, 26),
      },
      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(2, 15),
      },
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(2, 4),
      },
    },
    iconButton: {
      padding: theme.spacing(1),
    },
    button: {
      width: theme.spacing(20),
    },
  })
);

export default function ResultStep() {
  const state = useSelector(selectAnonymizer);
  const [Notification, notifyError, notifySuccess] = useNotification();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

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

  const handleReset = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcept = () => {
    handleClose();
    dispatch(updateReset());
    history.push(routes.ANONIMIZATION);
  };

  const renderActionButtons = () => {
    return (
      <>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Button
              onClick={() => handleDownloadClick()}
              variant="contained"
              size="small"
              color="primary"
              className={classes.button}
            >
              Descargar
              <DownloadIcon className={classes.iconButton} fontSize="small" />
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => handleDropboxPublishButtonClick()}
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
            >
              Dropbox
              <ShareIcon className={classes.iconButton} fontSize="small" />
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => handleDrivePublishButtonClick()}
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
            >
              Drive
              <ShareIcon className={classes.iconButton} fontSize="small" />
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => handleReset()}
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
            >
              Reiniciar
              <RefreshIcon className={classes.iconButton} fontSize="small" />
            </Button>
          </Grid>
        </Grid>
        <PopUpReset
          open={open}
          handleClose={handleClose}
          handleAcept={handleAcept}
        />
      </>
    );
  };
  const renderResultStep = () => {
    return (
      <div className={classes.results}>
        <Results
          title="Efectivadad Total"
          subtitle="Determinado por la cantidades identificadas."
          level={state.resultData.total.percent_total}
        />
      </div>
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
      {renderResultStep()}
      <Box mt={2}>{renderActionButtons()}</Box>
    </>
  );
}
