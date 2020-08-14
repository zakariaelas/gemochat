import { useEffect, useState } from 'react';

const useTrack = (publication) => {
  const [track, setTrack] = useState(
    publication && publication.track,
  );

  useEffect(() => {
    setTrack(publication && publication.track);
    if (publication) {
      const removeTrack = () => setTrack(null);
      publication.on('subscribed', setTrack);
      publication.on('unsubscribed', removeTrack);
      return () => {
        publication.off('subscribed', setTrack);
        publication.off('unsubscribed', removeTrack);
      };
    }
  }, [publication]);

  return track;
};

export default useTrack;
