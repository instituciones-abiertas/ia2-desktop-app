import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useAuthData, useLogin } from '../authHook';
import useNotification from '../../notifications/Notification';
import logoImage from '../../../assets/img/logo.png';
import routes from '../../../constants/routes.json';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    height: '100vh',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      width: theme.spacing(55),
    },
    marginTop: theme.spacing(1),
  },
  subtitle: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    width: theme.spacing(50),
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
    rememberMe: false,
  });

  function handleFormStateChange(event) {
    const { name, type, value, checked } = event.target;

    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(formState.email, formState.password)
      .then((data) => {
        history.push(routes.ANONIMIZATION);
        return data;
      })
      .catch((error) => {
        notifyError(authState.errorMessage);
      });
  }

  return (
    <Container className={classes.container} component="main" maxWidth="sm">
      <div className={classes.paper}>
        <img className={classes.logo} alt="logo" src={logoImage} />
        <Typography className={classes.subtitle} component="h6" variant="h6">
          Anonimizamos para una justicia abierta
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleFormStateChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleFormStateChange}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Iniciar sesión
          </Button>
          <Notification />
        </form>
      </div>
    </Container>
  );
}
