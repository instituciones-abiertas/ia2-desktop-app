import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import UploaderStep from '../../features/anonymizer/UploaderStep/UploaderStep';
import EditionStep from '../../features/anonymizer/EditionStep/EditionStep';
import ResultSep from '../../features/anonymizer/ResultStep/ResultStep';
import TopBar from '../TopBar/TopBar';
import {
  decrementStep,
  getAnonymization,
  getEntitiesFromDoc,
  incrementStep,
  selectAnonymizer,
  updateSuccess,
} from '../../features/anonymizer/anonymizerSlice';
import PopUpReset from '../ErrorVisualizer/PopUpReset';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      width: theme.spacing(18),
    },
    instructions: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(5),
    },
    stepper: {
      [theme.breakpoints.up('lg')]: {
        marginTop: theme.spacing(5),
        paddingLeft: theme.spacing(50),
        paddingRight: theme.spacing(50),
      },
      [theme.breakpoints.down('lg')]: {
        marginTop: theme.spacing(3),
        paddingLeft: theme.spacing(25),
        paddingRight: theme.spacing(25),
      },
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(12),
        paddingRight: theme.spacing(12),
      },
    },
    label: {
      fontSize: theme.spacing(2),
    },
    stepIcon: {
      fontSize: theme.spacing(6),
    },
    labelError: {
      color: '#f44336',
      opacity: '0.9',
    },
    iconButton: {
      padding: theme.spacing(1),
    },
    buttonWithIcon: {
      justifyContent: 'flex-start',
    },
  })
);

function getSteps() {
  return ['Carga de documento', 'Edición', 'Anonimización'];
}
function getStepContent(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return <UploaderStep />;
    case 1:
      return <EditionStep />;
    default:
      return <ResultSep />;
  }
}

export default function AnonymizationStepper() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const steps = getSteps();
  const state = useSelector(selectAnonymizer);
  const dispatch = useDispatch();

  function getStepAction(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return getEntitiesFromDoc(state.document, state.documentName);
      case 1:
        return getAnonymization(state.annotations, state.id);
      default:
        return () => {};
    }
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const isStepFailed = () => {
    return state.hasError;
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(state.activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(state.activeStep);
    }
    dispatch(getStepAction(state.activeStep));
    dispatch(incrementStep());
    setSkipped(newSkipped);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleBack = () => {
    handleClickOpen();
    dispatch(updateSuccess());
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcept = () => {
    handleClose();
    dispatch(decrementStep());
  };

  const isResultStep = () => {
    return state.activeStep === 2;
  };

  const isEditionStep = () => {
    return state.activeStep === 1;
  };

  const isUploaderStep = () => {
    return state.activeStep === 0;
  };

  return (
    <div className={classes.root}>
      <TopBar />
      <Stepper
        style={{ backgroundColor: 'transparent' }}
        activeStep={state.activeStep}
        className={classes.stepper}
      >
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    root: classes.stepIcon,
                  },
                }}
                error={index === state.activeStep && isStepFailed()}
                classes={{
                  label: classes.label,
                  error: classes.labelError,
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {getStepContent(state.activeStep)}
        {!state.isLoading && !state.hasError ? (
          <Grid
            container
            justify={
              isUploaderStep() || isResultStep() ? 'center' : 'space-around'
            }
            direction="row"
          >
            <Grid item>
              {isEditionStep() ? (
                <Button
                  disabled={state.hasError || !state.document}
                  onClick={handleBack}
                  color="primary"
                  variant="contained"
                  className={classes.button}
                >
                  <ArrowBackIosRoundedIcon
                    className={classes.iconButton}
                    fontSize="small"
                  />
                  VOLVER
                </Button>
              ) : null}
            </Grid>
            <Grid item>
              {!isResultStep() ? (
                <Button
                  disabled={state.hasError || !state.document}
                  variant="contained"
                  color="primary"
                  onClick={
                    state.activeStep === steps.length - 1
                      ? handleClickOpen
                      : handleNext
                  }
                  className={classes.button}
                >
                  {isUploaderStep() ? (
                    'PROCESAR'
                  ) : (
                    <>
                      SIGUIENTE
                      <ArrowForwardIosRoundedIcon
                        className={classes.iconButton}
                        fontSize="small"
                      />
                    </>
                  )}
                </Button>
              ) : null}
            </Grid>
          </Grid>
        ) : null}
        <PopUpReset
          open={open}
          handleClose={handleClose}
          handleAcept={handleAcept}
          message="Al hacerlo perderá los cambios realizados en el documento."
        />
      </>
    </div>
  );
}
