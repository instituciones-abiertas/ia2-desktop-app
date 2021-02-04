import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import {
  CssBaseline,
  Typography,
  Grow,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useAuthData, useLogin } from '../authHook';
import useNotification from '../../notifications/Notification';
import logoImage from '../../../assets/img/logo.png';
import routes from '../../../constants/routes.json';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    height: '100vh',
    backgroundColor: theme.palette.secondary.main,
  },
  inputField: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(10),
    color: theme.palette.secondary.main,
    padding: theme.spacing(0.5, 5),
    marginBottom: theme.spacing(3),
    fontSize: 'medium',
    fontFamily: 'Saira-Regular',
    '&:hover, &:focus': {
      color: theme.palette.primary.main,
      borderRadius: theme.spacing(10),
    },
  },
  inputLabel: {
    marginLeft: theme.spacing(3),
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontFamily: 'Saira-Regular',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      width: theme.spacing(55),
    },
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    width: '60%',
    fontWeight: 'bold',
    fontSize: 'medium',
    alignSelf: 'center',
    padding: theme.spacing(0.8),
    borderRadius: theme.spacing(10),
    '&:hover, &:focus': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.common.white,
    },
    '&:disabled': {
      color: theme.palette.primary.main,
    },
  },
  logo: {
    width: theme.spacing(28),
    marginBottom: theme.spacing(5),
  },
}));

export default function LogIn() {
  const history = useHistory();
  const authState = useAuthData();
  const classes = useStyles();

  const [login] = useLogin();
  const [Notification, notifyError] = useNotification();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  function handleFormStateChange(event) {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  const handleClickShowPassword = () => {
    setFormState({ ...formState, showPassword: !formState.showPassword });
  };

  function handleSubmit(e) {
    e.preventDefault();
    login(formState.email, formState.password)
      .then((data) => {
        history.push(routes.ANONIMIZATION);
        return data;
      })
      .catch(() => {
        notifyError(authState.errorMessage);
      });
  }

  return (
    <Container className={classes.container} component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.content}>
        <Grow in>
          <img className={classes.logo} alt="logo" src={logoImage} />
        </Grow>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Typography
            component="h6"
            variant="h6"
            className={classes.inputLabel}
          >
            EMAIL
          </Typography>
          <TextField
            classes={{ root: classes.inputField }}
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleFormStateChange}
            InputProps={{ disableUnderline: true }}
          />
          <Typography
            component="h6"
            variant="h6"
            className={classes.inputLabel}
          >
            CONTRASEÑA
          </Typography>
          <TextField
            classes={{ root: classes.inputField }}
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleFormStateChange}
            InputProps={{
              disableUnderline: true,
              type: formState.showPassword ? 'text' : 'password',
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {formState.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            disabled={!formState.email || !formState.password}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Iniciar sesión
          </Button>
          <Notification />
        </form>
      </div>
    </Container>
  );
}
