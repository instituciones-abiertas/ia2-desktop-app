import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Body from './body';

interface InstructionsProps {
  level: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontFamily: 'Saira-Bold',
    },
    effectivitySectionContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    effectivitySectionTitle: {
      backgroundColor: theme.palette.common.white,
      padding: theme.spacing(1.3),
      borderRadius: theme.spacing(10),
      paddingLeft: theme.spacing(3),
    },
    effectivitySectionCircle: {
      background: theme.palette.secondary.main,
      borderRadius: '50%',
      width: theme.spacing(9.5),
      height: theme.spacing(9.5),
      marginLeft: theme.spacing(-3.8),
      color: theme.palette.common.white,
      lineHeight: '5em',
      textAlign: 'center',
      fontSize: '1em',
      fontWeight: 'bold',
      fontFamily: 'Saira-Regular',
    },
  })
);

export default function Results(props: InstructionsProps) {
  const { level } = props;
  const classes = useStyles();

  return (
    <>
      <Typography
        align="center"
        className={classes.title}
        color="secondary"
        variant="h5"
      >
        ANONIMIZACIÓN COMPLETA
      </Typography>
      <Body />
      <Grid
        container
        direction="row"
        alignContent="center"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={4}>
          <Paper elevation={5} className={classes.effectivitySectionTitle}>
            <Typography align="left" color="secondary" variant="h6">
              Efectividad
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <div className={classes.effectivitySectionCircle}>{`${level}%`}</div>
        </Grid>
      </Grid>
    </>
  );
}
