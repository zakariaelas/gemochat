import React from 'react';
import {
  Box,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import useVideoContext from '../../hooks/useVideoContext';
import VideoTrack from '../VideoTrack/VideoTrack';

const useStyles = makeStyles((theme) => ({
  videoContainer: {
    borderRadius: 10,
    background: '#000',
  },
  video: {
    borderRadius: '0',
    boxShadow:
      '0 1px 3px hsla(0, 0%, 0%, .12), 0 1px 2px hsla(0, 0%, 0%, .24)',
  },
}));

const MainParticipantInfo = ({ participant, isLocal, children }) => {
  const { videoTrack } = useVideoContext();
  const { spacing } = useTheme();
  const classes = useStyles();

  return (
    <>
      <Box
        position="absolute"
        zIndex={1}
        color="#fff"
        p={0.5}
        top={0}
      >
        <Typography variant="body2">
          {participant.identity}
        </Typography>
      </Box>
      {!isLocal && (
        <Box
          width={spacing(14)}
          height={spacing(9)}
          position="absolute"
          zIndex={1}
          top={spacing(1.2)}
          right={spacing(1.2)}
        >
          <VideoTrack className={classes.video} track={videoTrack} />
        </Box>
      )}
      {children}
    </>
  );
};

export default MainParticipantInfo;
