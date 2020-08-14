import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mediumFontWeight: {
    fontWeight: 500,
  },
}));

const VideoStates = ({ loading, disabled, children }) => {
  const classes = useStyles();
  if (loading)
    return (
      <Typography
        className={classes.mediumFontWeight}
        align="center"
        variant="h6"
        color="inherit"
      >
        Camera is loading...
      </Typography>
    );
  else if (disabled) {
    return (
      <Typography
        className={classes.mediumFontWeight}
        variant="h6"
        align="center"
        color="inherit"
      >
        Camera is off
      </Typography>
    );
  } else return children;
};

VideoStates.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default VideoStates;
