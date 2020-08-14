import React, { useState } from 'react';
import RoomDoor from '../RoomDoor/RoomDoor';
import useCurrentUserContext from '../../hooks/useCurrentUserContext';
import RoomDoorLayout from '../../ui/RoomDoorLayout';
import IntervieweeRoom from '../IntervieweeRoom/IntervieweeRoom';
import InterviewerRoom from '../InterviewerRoom/InterviewerRoom';
import InterviewStateProvider from '../InterviewStateProvider/InterviewStateProvider';

const Room = (props) => {
  const [joined, setJoined] = useState(false);
  const { currentUser } = useCurrentUserContext();
  const [displayName, setDisplayName] = useState(
    currentUser.isAuthenticated ? currentUser.displayName : '',
  );
  const joinMeeting = () => {
    setJoined(true);
  };

  return (
    <>
      {joined ? (
        currentUser.isAuthenticated ? (
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
