import React, { useState, ReactChild } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    marginBottom: theme.spacing(20),
    backgroundColor: theme.palette.secondary.main,
    fontSize: theme.spacing(2),
  },
}));

function Alert(props: {
  onClose: (event: React.SyntheticEvent<Element, Event>) => void;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
  children: ReactChild;
}) {
  const classes = useStyles();
  const { onClose, severity, children } = props;
  return (
    <MuiAlert
      elevation={24}
      onClose={onClose}
      severity={severity}
      variant="outlined"
      classes={{
        root: classes.root,
      }}
    >
      {children}
    </MuiAlert>
  );
}

export default function useNotification() {
  const [color, setColor] = useState('success');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const notifySuccess = (text: string) => {
    setColor('success');
    setMessage(text);
    setOpen(true);
  };

  const notifyError = (text: string) => {
    setColor('error');
    setMessage(text);
    setOpen(true);
  };

  const Notification = () => {
    return (
      <Snackbar open={open} autoHideDuration={800} onClose={handleClose}>
        <Alert onClose={handleClose} severity={color}>
          {message}
        </Alert>
      </Snackbar>
    );
  };

  return [Notification, notifyError, notifySuccess];
}
