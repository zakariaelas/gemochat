import React from 'react';
import RoomDoorLayout from '../../ui/RoomDoorLayout';
import { useParams } from 'react-router-dom';
import useTwilioAccessToken from '../../hooks/useTwilioAccessToken';
import PeerMeeting from '../PeerMeeting/PeerMeeting';
import { Box } from '@material-ui/core';

const IntervieweeRoom = ({ displayName }) => {
  return (
    <RoomDoorLayout>
      <Box p={2}>
        <PeerMeeting displayName={displayName} />
      </Box>
    </RoomDoorLayout>
  );
};

export default IntervieweeRoom;
