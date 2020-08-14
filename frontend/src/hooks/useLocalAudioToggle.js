import { useCallback } from 'react';
import useVideoContext from './useVideoContext';
import useIsTrackEnabled from './useIsTrackEnabled';

const useLocalAudioToggle = () => {
  const { audioTrack } = useVideoContext();
  const isEnabled = useIsTrackEnabled(audioTrack);
  const toggleAudioEnabled = useCallback(() => {
    if (audioTrack) {
      audioTrack.isEnabled
        ? audioTrack.disable()
        : audioTrack.enable();
    }
  }, [audioTrack]);

  return [isEnabled, toggleAudioEnabled];
};

export default useLocalAudioToggle;
