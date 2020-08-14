import React, { useRef, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';

const Video = styled('video')({
  width: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
  borderRadius: 10,
  display: 'block',
});

const VideoTrack = ({ track, ...props }) => {
  const ref = useRef();
  useEffect(() => {
    if (!track) return () => {};
    const el = ref.current;
    el.muted = true;
    track.attach(el);
    return () => {
      track.detach(el);
    };
  }, [track]);

  if (!track) return null;

  const isFrontFacing =
    track.mediaStreamTrack.getSettings().facingMode !== 'environment';

  return (
    <Video
      {...props}
      ref={ref}
      style={isFrontFacing ? { transform: 'rotateY(180deg)' } : {}}
    />
  );
};

export default VideoTrack;
