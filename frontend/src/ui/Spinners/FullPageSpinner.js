import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerBox: {
    transform: 'translate(-50%, -50%)',
  },
}));

const FullPageSpinner = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.spinnerBox}>
        <CircularProgress {...props} />
      </div>
    </div>
  );
};

export default FullPageSpinner;
