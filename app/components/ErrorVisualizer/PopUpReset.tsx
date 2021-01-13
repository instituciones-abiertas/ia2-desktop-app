import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

interface PopUpResetProps {
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleAcept: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  message: string;
}

export default function PopUpReset(props: PopUpResetProps) {
  const { open, handleClose, handleAcept, message } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          ¿Está segurx que desea continuar?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message ??
              'Al hacerlo se perderán los cambios realizados sobre el documento actual.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAcept} color="primary">
            Aceptar
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
