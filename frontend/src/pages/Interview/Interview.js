import React from 'react';
import useIsInterviewValid from '../../hooks/useIsInterviewValid';
import { useParams } from 'react-router-dom';
import Room from '../../components/Room/Room';
import NotValidInterview from './NotValidInterview';
import LoadingContainer from '../../ui/Spinners/LoadingContainer';
import { VideoProvider } from '../../components/VideoProvider';

const Interview = () => {
  const { key } = useParams();
  const [valid, { isLoading }] = useIsInterviewValid(key);

  return (
    <LoadingContainer isLoading={isLoading || valid === undefined}>
      {valid ? (
        <VideoProvider
          onDisconnect={(room) => {
            room.localParticipant.tracks.forEach(({ track }) => {
              track.stop();
              track.detach();
            });
          }}
        >
          <Room />
        </VideoProvider>
      ) : (
        <NotValidInterview key={key} />
      )}
    </LoadingContainer>
  );
};

export default Interview;
