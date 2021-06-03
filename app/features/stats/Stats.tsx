import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { BarSeries, PieSeries } from 'ia2-annotation-tool';
import { Grid, useTheme } from '@material-ui/core';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import TopBar from '../../components/TopBar/TopBar';
import { getStats, selectStats, updateDateRange } from './statsSlice';
import Loader from '../../components/Loader/Loader';
import ErrorVisualizer from '../../components/ErrorVisualizer/ErrorVisualizerStats';
import { serializeRange, defaultRange } from './helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  margins: {
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(5),
      paddingLeft: theme.spacing(50),
      paddingRight: theme.spacing(50),
    },
    [theme.breakpoints.down('lg')]: {
      marginTop: theme.spacing(1),
      paddingLeft: theme.spacing(35),
      paddingRight: theme.spacing(35),
    },
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(1),
      paddingLeft: theme.spacing(18),
      paddingRight: theme.spacing(18),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  },
}));

export default function Stats() {
  const colors = ['#FFCA00', '#00D6A1', '#1F3366', '#FF7A68'];
  const classes = useStyles();
  const theme = useTheme();
  const textStyle = { fontFamily: theme.typography.fontFamily };
  const state = useSelector(selectStats);
  const dispatch = useDispatch();
  const [range, setRange] = useState(defaultRange);
  let renderComponents;

  const getPageComponents = () => (
    <div className={classes.margins}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <DateRangePicker onChange={setRange} value={range} />
        </Grid>
        <Grid item xs={6}>
          <PieSeries
            title={state.hechosTitle}
            series={state.hechos}
            colors={colors}
            textStyle={textStyle}
          />
        </Grid>
        <Grid item xs={6}>
          <BarSeries
            title={state.edadesTitle}
            series={state.edades}
            orientation="v"
            colors={colors}
            textStyle={textStyle}
          />
        </Grid>
        <Grid item xs={12}>
          <BarSeries
            title={state.lugaresTitle}
            series={state.lugares}
            orientation="h"
            colors={colors}
            textStyle={textStyle}
          />
        </Grid>
      </Grid>
    </div>
  );

  useEffect(() => {
    const serializedRange = serializeRange(range);
    dispatch(updateDateRange(serializedRange));
    const fetchData = async () => {
      dispatch(getStats());
    };
    fetchData();
  }, [range]);

  if (state.isLoading) {
    renderComponents = <Loader />;
  }

  if (state.hasError) {
    renderComponents = <ErrorVisualizer errorMessage={state.errorMessage} />;
  }

  if (!state.hasError && !state.isLoading) {
    renderComponents = getPageComponents();
  }

  return (
    <div className={classes.root}>
      <TopBar />
      {renderComponents}
    </div>
  );
}
