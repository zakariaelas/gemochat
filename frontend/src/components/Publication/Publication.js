import React from 'react';
import VideoTrack from '../VideoTrack/VideoTrack';
import AudioTrack from '../AudioTrack/AudioTrack';
import useTrack from '../../hooks/useTrack';

const Publication = ({ publication }) => {
  const track = useTrack(publication);
  if (!track) return null;

  switch (track.kind) {
    case 'video':
      return <VideoTrack track={track} />;
    case 'audio':
      return <AudioTrack track={track} />;
    default:
      return null;
  }
};

export default Publication;
