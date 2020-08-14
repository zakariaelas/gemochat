import React from 'react';
import RoomDoorLayout from '../../ui/RoomDoorLayout';
import { useParams } from 'react-router-dom';
import useTwilioAccessToken from '../../hooks/useTwilioAccessToken';
import PeerMeeting from '../PeerMeeting/PeerMeeting';
import { Box } from '@material-ui/core';

const IntervieweeRoom = ({ displayName }) => {
  const { meetingId } = useParams();
  const [token] = useTwilioAccessToken(displayName, meetingId);
  return (
    <RoomDoorLayout>
      <Box p={2}>
        <PeerMeeting token={token} />
      </Box>
    </RoomDoorLayout>
  );
};

export default IntervieweeRoom;
