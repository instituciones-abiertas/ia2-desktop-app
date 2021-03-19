import React from 'react';
import InfoIcon from '@material-ui/icons/InfoRounded';
import { Paper, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginRight: theme.spacing(6),
      marginLeft: theme.spacing(6),
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
    instructionsContainer: {
      '& > *': {
        // marginLeft: theme.spacing(6),
      },
    },
    instructionsIcon: {
      padding: theme.spacing(3),
      display: 'flex',
      alignSelf: 'start'
    },
    levelContainer: {
      flexGrow: 1,
      textAlign: 'end',
      margin: theme.spacing(3),
    },
    highLevelContainer: {
      backgroundColor: '#f44336',
    },
    mediumLevelContainer: {
      backgroundColor: '#ff9800',
    },
    lowLevelContainer: {
      backgroundColor: '#2196f3',
    },
    levelText: {
      fontWeight: 'bold',
    },
    header: {
      color: theme.palette.secondary.main,
      display: 'flex',
      flexDirection: 'row',
      fontFamily: theme.typography.fontFamily,
      alignItems: 'center',
      borderTopRightRadius: theme.spacing(2),
      borderTopLeftRadius: theme.spacing(2),
    },
  })
);

interface InstructionsProps {
  title: string;
  subtitle: string;
  level: string;
}

export default function Header(props: InstructionsProps) {
  const classes = useStyles();
  const { title, subtitle, level } = props;

  const isHightLevel = () => {
    return level < 50;
  };

  const isMediumLevel = () => {
    return level >= 50 && level < 70;
  };

  const isLowLevel = () => {
    return level >= 70;
  };

  const getLevelStyles = () => {
    switch (true) {
      case isHightLevel():
        return classes.highLevelContainer;
      case isMediumLevel():
        return classes.mediumLevelContainer;
      case isLowLevel():
        return classes.lowLevelContainer;
      default:
        return classes.mediumLevelContainer;
    }
  };

  return (
    <div className={classes.instructionsContainer}>
      <Paper
        square
        color="black"
        className={`${classes.header} ${getLevelStyles()}`}
        elevation={3}
      >
        <InfoIcon className={classes.instructionsIcon} fontSize="small" />
        <div>
          <Typography component="h1" variant="h6">
            {title}
          </Typography>
          <Typography component="h1" variant="body2">
            {subtitle}
          </Typography>
        </div>
        <div className={classes.levelContainer}>
          <Typography className={classes.levelText} component="h1" variant="h5">
            {level} %
          </Typography>
        </div>
      </Paper>
    </div>
  );
}
