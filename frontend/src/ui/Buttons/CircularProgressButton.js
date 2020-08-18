import React from 'react';
import {
  CircularProgress,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapped: {
    position: 'relative',
  },
  circularProgress: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const CircularProgressButton = ({
  children,
  containerProps = {},
  isLoading,
  ...props
}) => {
  const classes = useStyles();
  const classNameProps = containerProps.className || '';
  delete containerProps.className;
  return (
    <div
      className={`${classes.wrapped} ${classNameProps}`}
      {...containerProps}
    >
      {React.cloneElement(props.button, { disabled: isLoading })}
      {isLoading && (
        <CircularProgress
          size={24}
          className={classes.circularProgress}
          {...props}
        />
      )}
    </div>
  );
};

export default CircularProgressButton;
