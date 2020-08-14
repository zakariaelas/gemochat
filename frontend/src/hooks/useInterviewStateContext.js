import { useContext } from 'react';
import { InterviewStateContext } from '../components/InterviewStateProvider/InterviewStateProvider';

const useInterviewStateContext = () => {
  const context = useContext(InterviewStateContext);
  if (!context) {
    throw new Error(
      'useInterviewStateContext must be used within a InterviewStateContext',
    );
  }
  return context;
};

export default useInterviewStateContext;
