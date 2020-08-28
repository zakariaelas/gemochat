import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  DialogContent,
} from '@material-ui/core';
import useDialog from '../../hooks/useDialog';

const ErrorDialogFallback = ({ error }) => {
  const [open, { handleClose }] = useDialog(true);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="error-dialog-title">
        Something happened...
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="error-dialog-description">
          An error happened ... Please try refreshing the page. If the
          error persists, please notify an admin
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialogFallback;
