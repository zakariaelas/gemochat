import React, { useRef, useEffect } from 'react';
import useVideoContext from '../../hooks/useVideoContext';
import useRoomState from '../../hooks/useRoomState';
import VideoStates from '../../ui/VideoStates';
import { Box, makeStyles } from '@material-ui/core';
import MainParticipant from '../MainParticipant/MainParticipant';
import Controls from '../Controls/Controls';
import { useParams } from 'react-router-dom';
import useTwilioAccessToken from '../../hooks/useTwilioAccessToken';

const useStyles = makeStyles((theme) => ({
  videoContainer: {
    borderRadius: 10,
    background: '#000',
  },
}));

const PeerMeeting = ({ displayName }) => {
  const classes = useStyles();
  const { meetingId } = useParams();
  const [token] = useTwilioAccessToken(displayName, meetingId);
  const { room, connect, isConnecting } = useVideoContext();
  const roomState = useRoomState();
  const isDisconnected = roomState === 'disconnected';
  const cleanUpCallbackRef = useRef(() => {});

  useEffect(() => {
    if (room && room.disconnect)
      cleanUpCallbackRef.current = () => {
        room.disconnect();
      };
  }, [room]);

  useEffect(() => {
    if (token) connect(token);
  }, [token]);

  useEffect(() => {
    return () => {
      cleanUpCallbackRef.current();
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="557px"
      minWidth="864px"
      position="relative"
      color="#fff"
      className={classes.videoContainer}
    >
      <VideoStates loading={isConnecting} disabled={isDisconnected}>
        <MainParticipant />
        <Controls />
      </VideoStates>
    </Box>
  );
};

export default PeerMeeting;
