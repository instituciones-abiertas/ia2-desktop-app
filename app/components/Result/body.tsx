import React from 'react';
import { Paper } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TableResult from './table';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: 'transparent',
      padding: theme.spacing(3),
      margin: theme.spacing(3),
      overflowY: 'scroll',
      '*': {
        'scrollbar-width': 'thin',
      },
      [theme.breakpoints.up('lg')]: {
        height: theme.spacing(40),
      },
      [theme.breakpoints.down('lg')]: {
        height: theme.spacing(20),
      },
      [theme.breakpoints.down('md')]: {
        height: theme.spacing(20),
      },
    },
  })
);

export default function Body() {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.container}>
      <TableResult />
    </Paper>
  );
}
