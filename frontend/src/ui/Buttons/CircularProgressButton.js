import React from 'react';
import { CircularProgress } from '@material-ui/core';

const CircularProgressButton = ({
  children,
  isLoading,
  spinnerProps = { size: 16 },
  ...props
}) => {
  const progress = isLoading ? (
    <CircularProgress {...spinnerProps} />
  ) : null;
  return (
    <>
      {React.cloneElement(children, {
        disabled: isLoading,
        startIcon: progress,
      })}
    </>
  );
};

export default CircularProgressButton;
