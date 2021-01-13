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
import { selectAnonymizer, updateAnnotations } from '../anonymizerSlice';
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
    },
    selector: {
      color: theme.palette.secondary.main,
      [theme.breakpoints.down('lg')]: {
        width: theme.spacing(30),
      },
      [theme.breakpoints.up('lg')]: {
        width: theme.spacing(50),
      },
    },
    tagDescription: {
      marginLeft: theme.spacing(1),
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
      color: theme.palette.secondary.main,
    },
    root: {
      '& > *': {
        marginBottom: theme.spacing(5),
        height: theme.spacing(60),
        [theme.breakpoints.down('lg')]: {
          height: theme.spacing(30),
        },
        [theme.breakpoints.down('md')]: {
          height: theme.spacing(30),
        },
        [theme.breakpoints.down('sm')]: {
          height: theme.spacing(28),
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

  const handleEntitySelection = (value) => {
    dispatch(updateAnnotations(value));
  };

  const handleDelete = (index: number) => {
    if (index >= 0) {
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
          classes={{ icon: classes.selectorIcon }}
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
                <Typography component="h1" variant="body2">
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
    <Box m={3}>
      <div className={classes.container}>
        <div>
          <Instructions
            title="Selecciona una etiqueta"
            subtitle="Luego elimina, agrega o corrige las etiquetas de las entidades que deben ser anonimizadas."
          >
            {renderSelect()}
          </Instructions>
          <div className={classes.root}>
            <Paper elevation={5}>
              <TextAnnotator
                editableContent
                doubleTaggingOff
                style={{
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line',
                  overflowX: 'hidden',
                  overflowY: 'scroll',
                  backgroundColor: 'white',
                  color: '#333441',
                  border: 'solid',
                  borderColor: '#8a0f4a',
                  borderWidth: '0.2em',
                  height: '100%',
                  padding: '1.5em',
                  fontFamily: 'Montserrat',
                }}
                content={state.text}
                value={state.annotations}
                onChange={(value) => handleEntitySelection(value)}
                getSpan={(span) => ({
                  ...span,
                  text: 'protectedText',
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
      </div>
    </Box>
  );
}
