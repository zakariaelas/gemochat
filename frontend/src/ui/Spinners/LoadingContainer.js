import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const LoadingContainer = ({ isLoading, children, ...props }) => {
  return <>{isLoading ? <LoadingSpinner {...props} /> : children}</>;
};

export default LoadingContainer;
