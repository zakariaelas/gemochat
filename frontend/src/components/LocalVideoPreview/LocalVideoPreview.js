import React from 'react';
import VideoTrack from '../VideoTrack/VideoTrack';
import Controls from '../Controls/Controls';
import useVideoContext from '../../hooks/useVideoContext';
import VideoStates from '../../ui/VideoStates';

const LocalVideoPreview = () => {
  const { videoTrack, isAcquiringLocalTracks } = useVideoContext();
  return (
    <>
      <VideoStates
        loading={isAcquiringLocalTracks}
        disabled={!videoTrack}
      >
        <VideoTrack track={videoTrack} />
      </VideoStates>
      <Controls />
    </>
  );
};

export default LocalVideoPreview;
