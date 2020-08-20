import React, { useState } from 'react';
import RoomDoor from '../RoomDoor/RoomDoor';
import RoomDoorLayout from '../../ui/RoomDoorLayout';
import IntervieweeRoom from '../IntervieweeRoom/IntervieweeRoom';
import InterviewerRoom from '../InterviewerRoom/InterviewerRoom';
import InterviewStateProvider from '../InterviewStateProvider/InterviewStateProvider';
import { useAuth } from '../AuthProvider/AuthProvider';

const Room = (props) => {
  const [joined, setJoined] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [displayName, setDisplayName] = useState(
    isAuthenticated ? user.displayName : '',
  );
  const joinMeeting = () => {
    setJoined(true);
  };

  return (
    <>
      {joined ? (
        isAuthenticated ? (
          <InterviewStateProvider>
            <InterviewerRoom displayName={displayName} />
          </InterviewStateProvider>
        ) : (
          <IntervieweeRoom displayName={displayName} />
        )
      ) : (
        <RoomDoorLayout>
          <RoomDoor
            displayName={displayName}
            setDisplayName={setDisplayName}
            joinMeeting={joinMeeting}
          />
        </RoomDoorLayout>
      )}
    </>
  );
};

export default Room;
