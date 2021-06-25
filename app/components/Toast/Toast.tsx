import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.secondary.light,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.spacing(2),
    marginTop: theme.spacing(8),
    color: theme.palette.primary.dark,
  },
}));

function Alert({ className, onClose, severity, mesg }) {
  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      severity={severity}
      className={className}
      onClose={onClose}
    >
      {mesg}
    </MuiAlert>
  );
}

Alert.propTypes = {
  severity: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  mesg: PropTypes.string.isRequired,
};

Alert.defaultProps = {
  className: '',
};

export default function Toast({ severity, message, duration }) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [state, setState] = React.useState({
    open: true,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
    >
      <Alert
        className={classes.root}
        onClose={handleClose}
        severity={severity}
        mesg={message}
      />
    </Snackbar>
  );
}

Toast.propTypes = {
  severity: PropTypes.string,
  message: PropTypes.string,
  duration: PropTypes.number,
};

Toast.defaultProps = {
  severity: 'warning',
  message: '',
  duration: 5000,
};
