import React, { useEffect } from 'react';
import { Select, Grid, FormControl, MenuItem, Box } from '@material-ui/core';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Api } from '@ia2coop/ia2-annotation-tool';
import {
  updateDoc,
  selectAnonymizer,
  updateSubject,
  updateDocName,
  updateTags,
  updateSelectTag,
} from '../anonymizerSlice';
import { API } from '../../../constants/api';

const api = Api(API);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      flexDirection: 'row',
      width: theme.spacing(50),
      '@media (min-width:1920px)': {
        width: theme.spacing(70),
      },
    },
    label: {
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3),
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
    },
    selectContainer: {
      marginTop: theme.spacing(12),
      [theme.breakpoints.down('lg')]: {
        marginTop: theme.spacing(1),
      },
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(2),
      },
    },
    selectInput: {
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.spacing(10),
      color: theme.palette.secondary.main,
      padding: theme.spacing(1.6, 3),
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
    selectIconOpen: {
      color: theme.palette.secondary.main,
      marginRight: theme.spacing(2),
    },
    uploaderInput: {
      cursor: 'pointer',
      fontSize: 'small',
      fontWeight: 'bold',
      fontFamily: 'Saira-Expanded-Regular',
      color: theme.palette.secondary.main,
      maxWidth: '45%',
      height: '1.8em',
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.spacing(10),
      padding: theme.spacing(1.3, 2),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      placeItems: 'center',
      '&:hover': {
        color: theme.palette.common.white,
      },
    },
    uploaderText: {
      marginLeft: theme.spacing(3),
    },
    uploaderButtonText: {
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
      const result = await api.getEntities();
      dispatch(updateTags(result));
      // Setea como entidad default la primera entidad que provee el backend.Deberia dar error si no hay entidades desde el back.
      dispatch(updateSelectTag(result[0].name));
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
    <Box mb="5em">
      <Grid
        container
        direction="column"
        justify="space-around"
        alignContent="center"
        alignItems="center"
      >
        <Grid item xs={12} xl={12} className={classes.selectContainer}>
          <Typography component="h6" variant="h6" className={classes.label}>
            MATERIA
          </Typography>
          <FormControl color="primary" className={classes.formControl}>
            <Select
              fullWidth
              required
              color="primary"
              value={state.subject}
              onChange={(e) => handleSubjectChange(e)}
              classes={{
                select: classes.selectInput,
                icon: classes.selectIcon,
                iconOpen: classes.selectIconOpen,
              }}
              disableUnderline
            >
              <MenuItem value="PENAL">Penal</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6" className={classes.label}>
            DOCUMENTO
          </Typography>
          <Grid container direction="row" item xs={12} xl={12} justify="center">
            <FormControl className={classes.formControl}>
              <label className={classes.uploaderInput} htmlFor="file-upload">
                <div className={classes.uploaderButtonText}>
                  {state.documentName ? state.documentName : `SUBIR DOCUMENTO*`}
                </div>
                <input
                  id="file-upload"
                  required
                  type="file"
                  onChange={(e) => handleFileInput(e)}
                  accept=".doc, .docx, .odt"
                  hidden
                />
                <AttachFileRoundedIcon />
              </label>
              <Typography
                component="h6"
                variant="body2"
                className={classes.uploaderText}
              >
                *El documento debe tener extensión .odt, .doc, .docx
              </Typography>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
