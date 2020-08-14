import { useCallback, useState } from 'react';
import useVideoContext from './useVideoContext';

const useLocalVideoToggle = (props) => {
  const {
    videoTrack,
    room: { localParticipant },
    getLocalVideoTrack,
    onError,
  } = useVideoContext();
  const [isPublishing, setIsPublishing] = useState(false);

  const toggleVideoEnabled = useCallback(async () => {
    if (!isPublishing) {
      if (videoTrack) {
        if (localParticipant) {
          const localTrackPublication = localParticipant.unpublishTrack(
            videoTrack,
          );
          localParticipant.emit(
            'trackUnpublished',
            localTrackPublication,
          );
        }
        videoTrack.stop();
      } else {
        setIsPublishing(true);
        try {
          const track = await getLocalVideoTrack();
          if (localParticipant) localParticipant.publishTrack(track);
        } catch (err) {
          onError(err);
        }
        setIsPublishing(false);
      }
    }
  }, [
    videoTrack,
    localParticipant,
    getLocalVideoTrack,
    isPublishing,
    onError,
  ]);

  return [!!videoTrack, toggleVideoEnabled];
};

export default useLocalVideoToggle;
