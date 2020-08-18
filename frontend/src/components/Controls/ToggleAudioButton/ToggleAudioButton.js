import React from 'react';
import { Tooltip } from '@material-ui/core';
import { MicOff } from '@material-ui/icons';
import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle';
import ControlIconButton from '../../../ui/Buttons/ControlIconButton';
import LocalAudioLevelIndicator from '../../LocalAudioLevelIndicator/LocalAudioLevelIndicator';

const ToggleAudioButton = (props) => {
  const [isEnabled, toggleAudioEnabled] = useLocalAudioToggle();
  return (
    <Tooltip placement="top" title={isEnabled ? 'Mute' : 'Unmute'}>
      <ControlIconButton color="inherit" onClick={toggleAudioEnabled}>
        {isEnabled ? <LocalAudioLevelIndicator /> : <MicOff />}
      </ControlIconButton>
    </Tooltip>
  );
};

export default ToggleAudioButton;
