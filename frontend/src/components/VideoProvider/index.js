import React, { createContext } from 'react';
import useHandleRoomDisconnectionErrors from './useHandleRoomDisconnectionErrors/useHandleRoomDisconnectionErrors';
import useHandleOnDisconnect from './useHandleOnDisconnect/useHandleOnDisconnect';
import useHandleTrackPublicationFailed from './useHandleTrackPublicationFailed/useHandleTrackPublicationFailed';
import useLocalTracks from './useLocalTracks/useLocalTracks';
import useRoom from './useRoom/useRoom';

export const VideoContext = createContext(null);

export function VideoProvider({
  options,
  children,
  onError = () => {},
  onDisconnect = () => {},
}) {
  const onErrorCallback = (error) => {
    console.log(`ERROR: ${error.message}`, error);
    onError(error);
  };

  const {
    localTracks,
    getLocalVideoTrack,
    getLocalAudioTrack,
    isAcquiringLocalTracks,
  } = useLocalTracks();
  const audioTrack = localTracks.find(
    (track) => track.kind === 'audio',
  );
  const videoTrack = localTracks.find(
    (track) => track.kind === 'video',
  );
  const { room, isConnecting, connect } = useRoom(
    localTracks,
    onErrorCallback,
    options,
  );

  // Register onError and onDisconnect callback functions.
  useHandleRoomDisconnectionErrors(room, onError);
  useHandleTrackPublicationFailed(room, onError);
  useHandleOnDisconnect(room, onDisconnect);

  return (
    <VideoContext.Provider
      value={{
        room,
        localTracks,
        audioTrack,
        videoTrack,
        isConnecting,
        onError: onErrorCallback,
        onDisconnect,
        getLocalVideoTrack,
        getLocalAudioTrack,
        connect,
        isAcquiringLocalTracks,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}
