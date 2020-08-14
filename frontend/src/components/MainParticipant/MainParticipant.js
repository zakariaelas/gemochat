import React, { useEffect } from 'react';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';
import useMainParticipant from '../../hooks/useMainParticipant';
import MainParticipantInfo from '../MainParticipantInfo/MainParticipantInfo';
import useVideoContext from '../../hooks/useVideoContext';

const MainParticipant = (props) => {
  const { room } = useVideoContext();
  const mainParticipant = useMainParticipant();
  const isLocal = mainParticipant === room.localParticipant;

  return (
    <MainParticipantInfo
      isLocal={isLocal}
      participant={mainParticipant}
    >
      <ParticipantTracks participant={mainParticipant} />
    </MainParticipantInfo>
  );
};

export default MainParticipant;
