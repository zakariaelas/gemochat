import { useState, useEffect } from 'react';

const usePublications = (participant) => {
  const [publications, setPublications] = useState([]);
  useEffect(() => {
    setPublications(Array.from(participant.tracks.values()));
    const publicationAdded = (publication) =>
      setPublications((prevPublications) => [
        ...prevPublications,
        publication,
      ]);
    const publicationRemoved = (publication) =>
      setPublications((prevPublications) =>
        prevPublications.filter((pub) => pub !== publication),
      );
    participant.on('trackPublished', publicationAdded);
    participant.on('trackUnpublished', publicationRemoved);
    return () => {
      participant.off('trackPublished', publicationAdded);
      participant.off('trackUnpublished', publicationRemoved);
    };
  }, [participant]);

  return publications;
};

export default usePublications;
