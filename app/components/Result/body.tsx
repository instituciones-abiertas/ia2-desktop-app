import React from 'react';
import { Paper } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TableResult from './table';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
      overflowY: 'scroll',
      '*': {
        'scrollbar-width': 'thin',
      },
      [theme.breakpoints.up('lg')]: {
        height: theme.spacing(50),
      },
      [theme.breakpoints.down('lg')]: {
        height: theme.spacing(30),
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
    <Paper elevation={5} className={classes.paper}>
      <TableResult />
    </Paper>
  );
}
