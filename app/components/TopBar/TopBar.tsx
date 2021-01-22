import React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import {
  Breadcrumbs,
  createStyles,
  Link,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LogOutIcon from '@material-ui/icons/ExitToAppRounded';
import { useDispatch } from 'react-redux';
import routes from '../../constants/routes.json';
import styles from './TopBar.css';
import PopUpReset from '../ErrorVisualizer/PopUpReset';
import logoImage from '../../assets/img/logo-horizontal.png';
import { updateReset } from '../../features/anonymizer/anonymizerSlice';
import { useLogOut } from '../../features/login/authHook';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
  })
);

export default function TopBar() {
  const [open, setOpen] = React.useState(false);
  const [openLogOut, setOpenLogOut] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [logOut] = useLogOut();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcept = () => {
    handleClose();
    dispatch(updateReset());
    history.push(routes.ANONIMIZATION);
  };

  const handleLogOut = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setOpenLogOut(true);
  };

  const handleCloseLogOut = () => {
    setOpenLogOut(false);
  };

  const handleAceptLogOut = () => {
    handleClose();
    history.push(routes.LOGIN);
    logOut();
  };

  return (
    <>
      <AppBar color="secondary" position="static">
        <Toolbar color="secondary">
          <Box flexGrow={1} m={2}>
            <img className={styles.logo} alt="logo" src={logoImage} />
          </Box>
          <Box pr={2} alignItems="center">
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                color="inherit"
                href="/"
                onClick={handleClick}
                className={classes.link}
              >
                <HomeIcon className={classes.icon} />
                Inicio
              </Link>
              <Link
                href={routes.LOGIN}
                color="inherit"
                onClick={handleLogOut}
                className={classes.link}
              >
                <LogOutIcon className={classes.icon} />
                Salir de la sesión
              </Link>
            </Breadcrumbs>
          </Box>
        </Toolbar>
      </AppBar>
      <PopUpReset
        open={openLogOut}
        handleClose={handleCloseLogOut}
        handleAcept={handleAceptLogOut}
        message="Al hacerlo, cerrará su sesión de usuarix y perderá el estado del proceso actual."
      />
      <PopUpReset
        open={open}
        message="Al hacerlo, el documento anonimizado junto a los cambios realizados en el documento de perderán."
        handleClose={handleClose}
        handleAcept={handleAcept}
      />
    </>
  );
}
