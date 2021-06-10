import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { BarSeries, PieSeries } from 'ia2-annotation-tool';
import InfoIcon from '@material-ui/icons/Info';
import { Grid, Card, useTheme } from '@material-ui/core';
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
  statsHeader: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  firstGrahRow: {
    marginBottom: 40,
  },
  secondGrahRow: {
    marginBottom: 5,
  },
  noGraph: {
    fontFamily: 'Saira-Regular',
    lineHeight: 1.5,
    borderRadius: 10,
    textAlign: 'center',
  },
  graphContainer: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  scroller: {
    height: '76vh',
    width: '100%',
    overflowY: 'auto',
    display: 'block',
    paddingBottom: 20,
  },
  graphTitle: {
    fontFamily: 'Saira-Regular',
    textAlign: 'center',
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

  const renderEmpty = (
    <span className={classes.noGraph}>
      <p>
        <InfoIcon color="secondary" />
        <br />
        <strong>No hay informacion para mostrar.</strong>
        <br />
        Intente modificando el rango de fechas seleccionado.
      </p>
    </span>
  );

  const isEmpty = (data) => {
    return !data.length;
  };

  const renderEdades = () => {
    if (isEmpty(state.edades)) {
      return renderEmpty;
    }
    return (
      <BarSeries
        title={state.edadesTitle}
        series={state.edades}
        orientation="v"
        colors={colors}
        textStyle={textStyle}
      />
    );
  };

  const renderHechos = () => {
    if (isEmpty(state.hechos)) {
      return renderEmpty;
    }
    return (
      <PieSeries
        title={state.hechosTitle}
        series={state.hechos}
        colors={colors}
        textStyle={textStyle}
      />
    );
  };

  const renderLugares = () => {
    if (isEmpty(state.lugares)) {
      return renderEmpty;
    }
    return (
      <BarSeries
        title={state.lugaresTitle}
        series={state.lugares}
        orientation="h"
        colors={colors}
        textStyle={textStyle}
      />
    );
  };

  const getPageComponents = () => (
    <div className={classes.margins}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} className={classes.statsHeader}>
          <DateRangePicker onChange={setRange} value={range} />
        </Grid>
      </Grid>
      <div className={classes.scroller}>
        <Grid container direction="row" justify="center">
          <Grid item xs={6} className={classes.firstGrahRow}>
            <Card className={classes.graphContainer}>{renderHechos()}</Card>
          </Grid>
          <Grid item xs={6} className={classes.firstGrahRow}>
            <Card className={classes.graphContainer}>{renderEdades()}</Card>
          </Grid>
          <Grid item xs={12} className={classes.secondGrahRow}>
            <Card className={classes.graphContainer}>{renderLugares()}</Card>
          </Grid>
        </Grid>
      </div>
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
