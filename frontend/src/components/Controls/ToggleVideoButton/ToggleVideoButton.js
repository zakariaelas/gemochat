import React from 'react';
import { Tooltip } from '@material-ui/core';
import { Videocam, VideocamOff } from '@material-ui/icons';
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle';
import ControlIconButton from '../../../ui/Buttons/ControlIconButton';

const ToggleVideoButton = (props) => {
  const [isEnabled, toggleVideoEnabled] = useLocalVideoToggle();

  return (
    <Tooltip
      placement="top"
      title={isEnabled ? 'Turn off' : 'Turn on'}
    >
      <ControlIconButton color="inherit" onClick={toggleVideoEnabled}>
        {isEnabled ? <Videocam /> : <VideocamOff />}
      </ControlIconButton>
    </Tooltip>
  );
};

export default ToggleVideoButton;
