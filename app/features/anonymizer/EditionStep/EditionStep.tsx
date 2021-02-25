import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextAnnotator } from 'react-text-annotate';
import {
  Select,
  FormControl,
  MenuItem,
  Box,
  createStyles,
  makeStyles,
  Theme,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  selectAnonymizer,
  updateAnnotations,
  updateNewAnnotations,
  updateDeleteAnnotations,
} from '../anonymizerSlice';
import Instructions from '../../../components/Instructions/Instructions';
import styles from './EditionStep.css';
import ErrorVisualizer from '../../../components/ErrorVisualizer/ErrorVisualizer';
import Loader from '../../../components/Loader/Loader';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: theme.spacing(85),
      [theme.breakpoints.up('lg')]: {
        marginRight: theme.spacing(40),
        marginLeft: theme.spacing(40),
      },
      [theme.breakpoints.down('lg')]: {
        marginRight: theme.spacing(20),
        marginLeft: theme.spacing(20),
      },
      [theme.breakpoints.down('md')]: {
        marginRight: theme.spacing(8),
        marginLeft: theme.spacing(8),
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(0),
      },
    },
    selectInput: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.spacing(10),
      color: theme.palette.secondary.main,
      padding: theme.spacing(1, 3),
      fontSize: 'medium',
      fontWeight: 'bold',
      '&:hover, &:focus': {
        color: theme.palette.primary.main,
        borderRadius: theme.spacing(10),
      },
    },
    selectIcon: {
      color: theme.palette.primary.main,
      paddingRight: theme.spacing(2),
    },
    selector: {
      [theme.breakpoints.down('lg')]: {
        width: theme.spacing(30),
      },
      [theme.breakpoints.up('lg')]: {
        width: theme.spacing(50),
      },
    },
    tagDescription: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    tagTitle: {
      marginRight: theme.spacing(1),
    },
    selectorContainer: {
      flexGrow: 1,
      marginRight: theme.spacing(2),
      alignItems: 'center',
    },
    selectorIcon: {
      color: theme.palette.primary.main,
      paddingRight: theme.spacing(1),
    },
    root: {
      '& > *': {
        marginBottom: theme.spacing(5),
        height: theme.spacing(50),
        [theme.breakpoints.down('lg')]: {
          height: theme.spacing(23),
        },
        [theme.breakpoints.down('md')]: {
          height: theme.spacing(25),
        },
        [theme.breakpoints.down('sm')]: {
          height: theme.spacing(20),
        },
      },
    },
  })
);

export default function EditionStep() {
  const state = useSelector(selectAnonymizer);
  const dispatch = useDispatch();
  const [selectedTag, setSelectedTag] = useState<string>('PER');
  const classes = useStyles();

  const handleEntitySelection = (value, span) => {
    dispatch(updateNewAnnotations([span]));
  };

  const handleDelete = (index: number) => {
    if (index >= 0) {
      dispatch(updateDeleteAnnotations([state.annotations[index]]));
      dispatch(
        updateAnnotations([
          ...state.annotations.slice(0, index),
          ...state.annotations.slice(index + 1),
        ])
      );
    }
    return null;
  };

  const handleClick = (index: number) => {
    handleDelete(index);
  };

  const renderSelect = () => {
    return (
      <FormControl className={classes.selectorContainer} color="secondary">
        <Select
          label="TAG"
          fullWidth
          labelId="tag"
          id="tag"
          value={selectedTag}
          onChange={(event) => setSelectedTag(event.target.value as string)}
          className={classes.selector}
          color="secondary"
          classes={{ icon: classes.selectorIcon, select: classes.selectInput }}
          disableUnderline
        >
          {state.tags.map((tag) => {
            return (
              <MenuItem key={tag.id} value={tag.name}>
                <Typography
                  component="h1"
                  variant="subtitle1"
                  className={classes.tagTitle}
                >
                  {tag.name}
                </Typography>
                <Typography
                  component="h1"
                  variant="subtitle1"
                  className={classes.tagDescription}
                >
                  {tag.description}
                </Typography>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  if (state.isLoading) {
    return <Loader />;
  }

  if (state.hasError) return <ErrorVisualizer />;

  return (
    <Box>
      <div className={classes.container}>
        <Instructions
          title="Selecciona una etiqueta"
          subtitle="Luego elimina, agrega o corrige las entidades identificadas."
        >
          {renderSelect()}
        </Instructions>
        <div className={classes.root}>
          <Paper elevation={5}>
            <TextAnnotator
              editableContent
              doubleTaggingOff
              style={{
                lineHeight: 2,
                fontSize: 'large',
                whiteSpace: 'pre-line',
                overflowX: 'hidden',
                overflowY: 'scroll',
                backgroundColor: 'var(--contrast-color)',
                color: 'var(--secondary-color)',
                borderBottom: 'solid',
                borderColor: 'var(--secondary-color)',
                borderWidth: '0.1em',
                height: '100%',
                padding: '3em',
                fontFamily: 'Saira-Regular',
                zoom: 1,
              }}
              content={state.text}
              value={state.annotations.concat(state.newAnnotations)}
              onChange={(value, span) => handleEntitySelection(value, span)}
              getSpan={(span) => ({
                ...span,
                should_anonymized: true,
                human_marked_ocurrency: true,
                tag: selectedTag,
              })}
              markClass={styles.mark}
              tagNameColor={styles.mark}
              handleClick={(index) => handleClick(index)}
              withCompletedWordSelection
            />
          </Paper>
        </div>
      </div>
    </Box>
  );
}
