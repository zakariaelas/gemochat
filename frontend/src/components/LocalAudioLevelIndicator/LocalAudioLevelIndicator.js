import React from 'react';
import AudioLevelIndicator from '../AudioLevelIndicator/AudioLevelIndicator';
import useVideoContext from '../../hooks/useVideoContext';

export default function LocalAudioLevelIndicator() {
  const { audioTrack } = useVideoContext();
  return <AudioLevelIndicator size={30} audioTrack={audioTrack} />;
}
