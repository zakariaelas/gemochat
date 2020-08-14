import { useState, useEffect } from 'react';
import useVideoContext from './useVideoContext';

const useParticipants = () => {
  const { room } = useVideoContext();
  // room has a property "participants" of type Map<ParticipantSID, RemoteParticipant>
  // we are only concerned with the values of the Map object
  const [participants, setParticipants] = useState(
    Array.from(room.participants.values()),
  );

  useEffect(() => {
    const participantConnected = (participant) =>
      setParticipants((prevParticipants) => [
        ...prevParticipants,
        participant,
      ]);
    const participantDisconnected = (participant) =>
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant),
      );
    room.on('participantConnected', participantConnected);
    room.on('participantDisconnected', participantDisconnected);
    return () => {
      room.off('participantConnected', participantConnected);
      room.off('participantDisconnected', participantDisconnected);
    };
  }, [room]);

  return participants;
};

export default useParticipants;
