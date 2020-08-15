import React from 'react';
import { withStyles, Button } from '@material-ui/core';

const ButtonPrimary = withStyles((theme) => ({
  root: {
    borderRadius: 50,
    textTransform: 'capitalize',
    fontWeight: 500,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: `${theme.spacing(0.25)}px ${theme.spacing(1)}px`,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  disabled: {
    backgroundColor: '#f5f6fa',
  },
}))((props) => <Button {...props} variant="outlined" />);

export default ButtonPrimary;
