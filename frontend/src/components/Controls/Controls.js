import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import ToggleAudioButton from './ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from './ToggleVideoButton/ToggleVideoButton';
import useRoomState from '../../hooks/useRoomState';
import EndCallButton from './EndCallButton/EndCallButton';

const useStyles = makeStyles((theme) => ({
  overlay: {
    background:
      'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(28,27,27,0.5732844163055848) 100%)',
  },
}));

const Controls = () => {
  const classes = useStyles();
  const roomState = useRoomState();
  const isReconnecting = roomState === 'reconnecting';
  return (
    <Box
      width="100%"
      display="flex"
      className={classes.overlay}
      position="absolute"
      justifyContent="center"
      alignItems="center"
      bottom={0}
      borderRadius="10px"
      py={0.5}
      pb={1}
      color="white"
    >
      <Box mr={1.5}>
        <ToggleAudioButton disabled={isReconnecting} />
      </Box>
      <Box mr={1.5}>
        <ToggleVideoButton disabled={isReconnecting} />
      </Box>
      {roomState !== 'disconnected' && (
        <Box mr={1.5}>
          <EndCallButton />
        </Box>
      )}
    </Box>
  );
};

Controls.propTypes = {};

export default Controls;
