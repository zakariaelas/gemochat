import React from 'react';
import { withStyles, Tab } from '@material-ui/core';

const NavTab = withStyles((theme) => ({
  root: {
    textTransform: 'capitalize',
    minWidth: 'fit-content',
    color: '#CBD2D9',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    padding: 0,
    fontSize: theme.spacing(1.25),
    marginRight: theme.spacing(3),
    '&:focus': {
      opacity: 1,
    },
  },
  selected: {
    color: '#fff',
  },
  wrapper: {
    alignItems: 'flex-start',
  },
}))((props) => <Tab disableRipple {...props} />);

export default NavTab;
