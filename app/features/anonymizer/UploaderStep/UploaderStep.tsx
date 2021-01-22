import React, { useEffect } from 'react';
import {
  Select,
  Grid,
  FormControl,
  MenuItem,
  InputBase,
  withStyles,
} from '@material-ui/core';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import styles from './UploaderStep.css';
import {
  updateDoc,
  selectAnonymizer,
  updateSubject,
  updateDocName,
  updateTags,
} from '../anonymizerSlice';
import { getEntities } from '../../../api/anonymizationApi';

const SelectInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      '&:focus': {
        borderRadius: 4,
        borderColor: theme.palette.primary.main,
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      display: 'flex',
      flexDirection: 'row',
      margin: theme.spacing(1),
      width: theme.spacing(50),
      '@media (min-width:1920px)': {
        width: theme.spacing(70),
      },
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    text: {
      marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(5),
    },
    label: {
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(3),
      color: '#5d5c5c',
      fontWeight: 'bold',
    },
    selector: {
      marginTop: theme.spacing(12),
      [theme.breakpoints.down('lg')]: {
        marginTop: theme.spacing(8),
      },
    },
    uploader: {
      marginTop: theme.spacing(5),
    },
    root: {
      width: theme.spacing(30),
      height: theme.spacing(40),
    },
    selectInput: {
      backgroundColor: 'white',
      border: 'solid',
      borderWidth: '2px',
      borderRadius: '8px',
      color: '#5d5c5c',
      borderColor: '#5d5c5c',
      padding: theme.spacing(2),
      fontSize: 'small',
      fontWeight: 'bold',
      '&:hover, &:focus': {
        color: theme.palette.primary.main,
        border: 'solid',
        borderColor: theme.palette.primary.main,
        borderWidth: '2px',
        borderRadius: theme.spacing(1),
      },
    },
    uploadButtonText: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })
);

export default function UploaderStep() {
  const dispatch = useDispatch();
  const state = useSelector(selectAnonymizer);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getEntities();
      dispatch(updateTags(result));
    };
    fetchData();
  }, [dispatch]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateDoc(
        e.target.files ? window.URL.createObjectURL(e.target.files[0]) : null
      )
    );
    dispatch(updateDocName(e.target.files ? e.target.files[0].name : null));
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSubject(e.target.value ? (e.target.value as string) : null));
  };

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignContent="center"
      alignItems="center"
    >
      <Grid item xs={12} xl={8} className={classes.selector}>
        <Typography component="h6" variant="body2" className={classes.label}>
          MATERIA
        </Typography>
        <FormControl color="primary" className={classes.formControl}>
          <Select
            variant="outlined"
            fullWidth
            required
            color="primary"
            value={state.subject}
            onChange={(e) => handleSubjectChange(e)}
            classes={{
              select: classes.selectInput,
            }}
            input={<SelectInput />}
          >
            <MenuItem value="PENAL">PENAL</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} xl={8} className={classes.uploader}>
        <FormControl className={classes.formControl}>
          <label className={styles.fileInputLabel} htmlFor="file-upload">
            <div className={classes.uploadButtonText}>
              {state.documentName ? state.documentName : `SUBIR DOCUMENTO*`}
            </div>
            <input
              id="file-upload"
              required
              type="file"
              onChange={(e) => handleFileInput(e)}
              accept=".doc, .docx, .odt"
            />
            <AttachFileRoundedIcon />
          </label>
        </FormControl>
        <Typography component="h6" variant="body2" className={classes.text}>
          *El documento debe tener extensión .odt, .doc, .docx
        </Typography>
      </Grid>
    </Grid>
  );
}
