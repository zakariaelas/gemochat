import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  container: (props) => ({
    minHeight: props.minHeight || '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  spinnerBox: {
    transform: 'translate(-50%, -50%)',
  },
}));

const LoadingSpinner = ({ minHeight, ...props }) => {
  const classes = useStyles({ minHeight });
  return (
    <div className={classes.container}>
      <div className={classes.spinnerBox}>
        <CircularProgress thickness={4} {...props} disableShrink />
      </div>
    </div>
  );
};

export default LoadingSpinner;
