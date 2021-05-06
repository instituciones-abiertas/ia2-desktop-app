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
import { Api } from 'ia2-annotation-tool';
import { selectAnonymizer, updateReset } from '../anonymizerSlice';
import Loader from '../../../components/Loader/Loader';
import useNotification from '../../notifications/Notification';
import ErrorVisualizer from '../../../components/ErrorVisualizer/ErrorVisualizer';
import Results from '../../../components/Result/Results';
import routes from '../../../constants/routes.json';
import PopUpReset from '../../../components/ErrorVisualizer/PopUpReset';
import { getDownloadFileName } from '../../../utils';
import { API } from '../../../constants/api';

const api = Api(API);

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
    actionButton: {
      width: theme.spacing(20),
      borderRadius: theme.spacing(10),
      fontFamily: 'Saira-Expanded-Regular',
      fontWeight: 'bold',
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
    const downloadFilename = getDownloadFileName(state.documentName);

    api
      .getDocToDownload(state.id, downloadFilename, state.task_id)
      .then(() => {
        notifySuccess('Esta el documento');
      })
      .catch((error) => {
        if (error.request.status == 409) {
          notifyError('Aun no esta disponible el documento');
        } else {
          notifyError('No se pudo descargar el documento.');
        }
      });
  };

  const handleDropboxPublishButtonClick = () => {
    api
      .getDocPublished(state.id)
      .then(() => {
        notifySuccess(
          'Se ha publicado el documento anonimizado en su cuenta de Dropbox.'
        );
        return null;
      })
      .catch(() => {
        notifyError('No se pudo publicar el documento.');
      });
  };

  const handleDrivePublishButtonClick = () => {
    api
      .getDocPublishedToDrive(state.id)
      .then(() => {
        notifySuccess(
          'Se ha publicado el documento anonimizado en su cuenta de Google Drive.'
        );
        return null;
      })
      .catch(() => {
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
              className={classes.actionButton}
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
              className={classes.actionButton}
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
              className={classes.actionButton}
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
              className={classes.actionButton}
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
        <Results level={state.resultData.total.percent_total} />
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
