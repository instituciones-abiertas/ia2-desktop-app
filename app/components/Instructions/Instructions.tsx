import React, { ReactChild } from 'react';
import InfoIcon from '@material-ui/icons/InfoRounded';
import { Paper, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginRight: theme.spacing(6),
      marginLeft: theme.spacing(6),
      paddingTop: theme.spacing(10),
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        marginBottom: theme.spacing(5),
        '@media (max-width:780px)': { height: theme.spacing(10) },
        '@media (min-width:780px)': { height: theme.spacing(20) },
        '@media (min-width:1024px)': { height: theme.spacing(30) },
        '@media (min-width:1920px)': { height: theme.spacing(60) },
      },
    },
    title: {
      fontWeight: 'bold',
    },
    instructionsIcon: {
      padding: theme.spacing(3),
    },
    instructions: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
      display: 'flex',
      flexDirection: 'row',
      fontFamily: theme.typography.fontFamily,
      alignItems: 'center',
      borderTopRightRadius: theme.spacing(2),
      borderTopLeftRadius: theme.spacing(2),
    },
    textContainer: {
      width: theme.spacing(50),
    },
  })
);

interface InstructionsProps {
  title: string;
  subtitle: string;
  children?: ReactChild;
}

export default function Instructions(props: InstructionsProps) {
  const classes = useStyles();
  const { title, subtitle, children } = props;
  return (
    <>
      <Paper square className={classes.instructions} elevation={3}>
        <InfoIcon className={classes.instructionsIcon} fontSize="large" />
        <div className={classes.textContainer}>
          <Typography
            className={classes.title}
            component="h1"
            variant="subtitle1"
          >
            {title}
          </Typography>
          <Typography component="h1" variant="body2">
            {subtitle}
          </Typography>
        </div>
        {children || null}
      </Paper>
    </>
  );
}

Instructions.defaultProps = {
  children: null,
};