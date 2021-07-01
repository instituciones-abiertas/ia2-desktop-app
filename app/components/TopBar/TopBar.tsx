import React from 'react';
import { useHistory, Link as LinkReact } from 'react-router-dom';
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
import EqualizerIcon from '@material-ui/icons/Equalizer';
import LogOutIcon from '@material-ui/icons/ExitToAppRounded';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../constants/routes.json';
import PopUpReset from '../ErrorVisualizer/PopUpReset';
import logoImage from '../../assets/img/logo_verde.png';
import {
  updateReset,
  selectAnonymizer,
} from '../../features/anonymizer/anonymizerSlice';
import { useLogOut } from '../../features/login/authHook';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      display: 'flex',
      color: theme.palette.common.white,
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    logo: {
      [theme.breakpoints.up('lg')]: {
        maxWidth: '5%',
      },
      [theme.breakpoints.down('lg')]: {
        maxWidth: '5%',
      },
      [theme.breakpoints.down('md')]: {
        maxWidth: '6%',
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '12%',
      },
    },
  })
);

export default function TopBar() {
  const [openLogOut, setOpenLogOut] = React.useState(false);
  const [openInit, setOpenInit] = React.useState(false);
  const [messageInit, setMessageInit] = React.useState('');
  const [openStats, setOpenStats] = React.useState(false);
  const [messageStats, setMessageStats] = React.useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const state = useSelector(selectAnonymizer);
  const [logOut] = useLogOut();

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
    handleCloseLogOut();
    history.push(routes.LOGIN);
    logOut();
  };

  const handleCloseInit = () => {
    setOpenInit(false);
  };

  const handleAceptInit = () => {
    setOpenInit(false);
    dispatch(updateReset());
    history.push(routes.ANONIMIZATION);
  };

  const handleCloseStats = () => {
    setOpenStats(false);
  };

  const handleAceptStats = () => {
    setOpenStats(false);
    dispatch(updateReset());
    history.push(routes.STATS);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    switch (state.activeStep) {
      case 1:
        setMessageInit(
          'Al hacerlo, el documento anonimizado junto a los cambios realizados en el documento se perderán.'
        );
        return setOpenInit(true);
      case 2:
        setMessageInit(
          'Si no descargó el documento anonimizado, se perderá así como los cambios realizados al mismo.'
        );
        return setOpenInit(true);
      default:
        handleCloseInit();
        dispatch(updateReset());
        history.push(routes.ANONIMIZATION);
        return false;
    }
  };

  const handleClickStats = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    switch (state.activeStep) {
      case 1:
        setMessageStats(
          'Al hacerlo, el documento anonimizado junto a los cambios realizados en el documento se perderán.'
        );
        return setOpenStats(true);
      case 2:
        setMessageStats(
          'Si no descargó el documento anonimizado, se perderá así como los cambios realizados al mismo.'
        );
        return setOpenStats(true);
      default:
        handleCloseStats();
        dispatch(updateReset());
        history.push(routes.STATS);
        return false;
    }
  };

  return (
    <>
      <AppBar color="secondary" position="static">
        <Toolbar color="secondary">
          <Box flexGrow={1} m={1}>
            <img className={classes.logo} alt="logo" src={logoImage} />
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
              <LinkReact
                to={routes.STATS}
                color="inherit"
                className={`${classes.link} MuiLink-underlineHover`}
                onClick={handleClickStats}
              >
                <EqualizerIcon className={classes.icon} />
                Estadísticas
              </LinkReact>
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
        message="Al hacerlo, cerrará su sesión de usuarix y perderá el estado del proceso actual."
        handleClose={handleCloseLogOut}
        handleAcept={handleAceptLogOut}
      />
      <PopUpReset
        open={openInit}
        message={messageInit}
        handleClose={handleCloseInit}
        handleAcept={handleAceptInit}
      />
      <PopUpReset
        open={openStats}
        message={messageStats}
        handleClose={handleCloseStats}
        handleAcept={handleAceptStats}
      />
    </>
  );
}
