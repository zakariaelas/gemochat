import React from 'react';
import usePublications from '../../hooks/usePublications';
import Publication from '../Publication/Publication';

const ParticipantTracks = ({ participant }) => {
  const publications = usePublications(participant);
  return (
    <>
      {publications.map((publication) => (
        <Publication
          key={publication.kind}
          participant={participant}
          publication={publication}
        />
      ))}
    </>
  );
};

export default ParticipantTracks;
