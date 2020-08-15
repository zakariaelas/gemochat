import React from 'react';
import { withStyles, Button } from '@material-ui/core';

const ButtonSecondary = withStyles((theme) => ({
  root: {
    borderRadius: 50,
    textTransform: 'capitalize',
    fontWeight: 500,
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    padding: `${theme.spacing(0.25)}px ${theme.spacing(1)}px`,
    '&:hover': {
      backgroundColor: '#F8FAFC',
    },
  },
  disabled: {
    backgroundColor: '#f5f6fa',
  },
}))((props) => <Button {...props} variant="outlined" />);

export default ButtonSecondary;
