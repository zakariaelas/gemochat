import useVideoContext from './useVideoContext';
import useParticipants from './useParticipants';

const useMainParticipant = () => {
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants = useParticipants();
  return participants[0] || localParticipant;
};

export default useMainParticipant;
