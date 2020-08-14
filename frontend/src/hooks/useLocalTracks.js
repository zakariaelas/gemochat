import { useCallback, useEffect, useState } from 'react';
import Video from 'twilio-video';

export default function useLocalTracks() {
  const [audioTrack, setAudioTrack] = useState();
  const [videoTrack, setVideoTrack] = useState();
  const [
    isAcquiringLocalTracks,
    setIsAcquiringLocalTracks,
  ] = useState(false);

  const getLocalAudioTrack = useCallback((deviceId) => {
    const options = {};

    if (deviceId) {
      options.deviceId = { exact: deviceId };
    }

    return Video.createLocalAudioTrack(options).then((newTrack) => {
      setAudioTrack(newTrack);
      return newTrack;
    });
  }, []);

  const getLocalVideoTrack = useCallback((newOptions) => {
    // In the DeviceSelector and FlipCameraButton components, a new video track is created,
    // then the old track is unpublished and the new track is published. Unpublishing the old
    // track and publishing the new track at the same time sometimes causes a conflict when the
    // track name is 'camera', so here we append a timestamp to the track name to avoid the
    // conflict.
    const options = {
      frameRate: 24,
      height: 720,
      width: 1280,
      name: `camera-${Date.now()}`,
      ...newOptions,
    };

    return Video.createLocalVideoTrack(options).then((newTrack) => {
      setVideoTrack(newTrack);
      return newTrack;
    });
  }, []);

  useEffect(() => {
    setIsAcquiringLocalTracks(true);
    Video.createLocalTracks({
      video: {
        frameRate: 24,
        height: 720,
        width: 1280,
        name: `camera-${Date.now()}`,
      },
      audio: true,
    })
      .then((tracks) => {
        const videoTrack = tracks.find(
          (track) => track.kind === 'video',
        );
        const audioTrack = tracks.find(
          (track) => track.kind === 'audio',
        );
        if (videoTrack) {
          setVideoTrack(videoTrack);
        }
        if (audioTrack) {
          setAudioTrack(audioTrack);
        }
      })
      .finally(() => setIsAcquiringLocalTracks(false));
  }, []);

  useEffect(() => {
    const handleStopped = () => setAudioTrack(undefined);
    if (audioTrack) {
      audioTrack.on('stopped', handleStopped);
      return () => {
        audioTrack.off('stopped', handleStopped);
      };
    }
  }, [audioTrack]);

  useEffect(() => {
    const handleStopped = () => setVideoTrack(undefined);
    if (videoTrack) {
      videoTrack.on('stopped', handleStopped);
      return () => {
        videoTrack.off('stopped', handleStopped);
      };
    }
  }, [videoTrack]);

  const localTracks = [audioTrack, videoTrack].filter(
    (track) => track !== undefined,
  );

  return {
    localTracks,
    getLocalVideoTrack,
    getLocalAudioTrack,
    isAcquiringLocalTracks,
  };
}
