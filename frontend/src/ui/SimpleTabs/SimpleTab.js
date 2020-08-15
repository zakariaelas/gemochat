import React from 'react';
import { withStyles, Tab } from '@material-ui/core';

const SimpleTab = withStyles((theme) => ({
  root: {
    textTransform: 'capitalize',
    minWidth: 'fit-content',
    color: '#828282',
    fontWeight: 500,
    padding: 0,
    fontSize: theme.spacing(1.125),
    marginRight: theme.spacing(2),
  },
  selected: {
    color: theme.palette.primary.main,
  },
}))((props) => <Tab disableRipple {...props} />);

export default SimpleTab;
