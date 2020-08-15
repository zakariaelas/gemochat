import React from 'react';
import { withStyles, Button } from '@material-ui/core';

const ButtonPrimary = withStyles((theme) => ({
  root: {
    borderRadius: 50,
    textTransform: 'capitalize',
    fontWeight: 500,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: `0 ${theme.spacing(1)}px`,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))((props) => <Button {...props} variant="outlined" />);

export default ButtonPrimary;
