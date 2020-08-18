import React from 'react';
import { styled, Fab } from '@material-ui/core';

const FixedFab = styled(Fab)((props) => ({
  position: 'absolute',
  right: props.right || 'auto',
  bottom: props.bottom || 'auto',
  left: props.left || 'auto',
  top: props.top || 'auto',
}));

export default FixedFab;
