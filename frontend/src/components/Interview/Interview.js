import React from 'react';
import useIsInterviewValid from '../../hooks/useIsInterviewValid';
import { useParams } from 'react-router-dom';
import Room from '../Room/Room';
import NotValidInterview from './NotValidInterview';
import LoadingContainer from '../../ui/Spinners/LoadingContainer';
import { VideoProvider } from '../VideoProvider';

const Interview = () => {
  const { meetingId } = useParams();
  const [valid, { isLoading }] = useIsInterviewValid(meetingId);
  console.log(isLoading, valid);

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
        <NotValidInterview meetingId={meetingId} />
      )}
    </LoadingContainer>
  );
};

export default Interview;
