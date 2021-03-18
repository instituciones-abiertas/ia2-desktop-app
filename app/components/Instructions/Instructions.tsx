import React, { ReactChild } from 'react';
import InfoIcon from '@material-ui/icons/InfoRounded';
import { Paper, Typography, Box } from '@material-ui/core';
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
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(0.5),
    },
    instructionsIcon: {
      padding: theme.spacing(3),
      alignSelf: 'flex-start',
      paddingTop: theme.spacing(1)
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
      width: theme.spacing(70),
    },
    smallbox: {
      float: 'left',
      width: '10px',
      height: '10px',
      marginTop: '5px',
      marginBottom: '5px',
      marginRight: '5px',
      border: '1px solid rgba(0, 0, 0, 0.2)',
    },
    legendsBox: {
      display: 'flex',
      backgroundColor: 'transparent',
      marginTop: '0.7rem',
      marginBottom: '0.7rem',
      justifyContent: 'flex-start',
      width: '70%',
    },
  })
);

interface InstructionsProps {
  title: string;
  subtitle: string;
  legends: [];
  children?: ReactChild;
}

export default function Instructions(props: InstructionsProps) {
  const classes = useStyles();
  const { title, subtitle, legends, children } = props;
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
          <Box className={classes.legendsBox}>
            {legends.map((legend, index) => {
              return (
                <Typography component="span" style={{display: 'flex', alignItems: 'center'}}>
                  <span
                    className={classes.smallbox}
                    style={{
                      backgroundColor: legend.color,
                      marginLeft: index !== 0 ? '5px' : '0px'
                    }}
                  />
                  <Typography variant="caption">
                    {legend.description}
                  </Typography>
                </Typography>
              );
            })}
          </Box>
        </div>
        {children || null}
      </Paper>
    </>
  );
}

Instructions.defaultProps = {
  children: null,
};
