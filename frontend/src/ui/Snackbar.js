import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

// Small wrapper around the notistack library
// Allows to imperatively show a snackbar on screen.
// PS: notistack's API is already imperative, so this component just wraps ...
// an already imperative API for convenience.

const mountPoint = document.createElement('div');
document.body.appendChild(mountPoint);

export default {
  success: function (message) {
    this.toast(message, 'success');
  },
  error: function (message) {
    this.toast(message, 'error');
  },
  info: function (message) {
    this.toast(message, 'info');
  },
  warning: function (message) {
    this.toast(message, 'warning');
  },
  toast: function (message, variant = 'default') {
    const Snackbar = ({ message }) => {
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();
      const action = (key) => (
        <IconButton
          style={{ color: 'white' }}
          onClick={() => closeSnackbar(key)}
        >
          <Close fontSize="small" />
        </IconButton>
      );
      enqueueSnackbar(message, { variant, action });
      return null;
    };
    ReactDOM.render(
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Snackbar message={message} variant={variant} />
      </SnackbarProvider>,
      mountPoint,
    );
  },
};
