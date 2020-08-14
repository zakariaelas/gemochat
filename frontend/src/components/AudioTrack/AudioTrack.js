import { useRef, useEffect } from 'react';

const AudioTrack = ({ track }) => {
  const audioEl = useRef();

  useEffect(() => {
    audioEl.current = track.attach();
    document.body.appendChild(audioEl.current);
    return () => track.detach().forEach((el) => el.remove());
  }, [track]);

  return null;
};

export default AudioTrack;
