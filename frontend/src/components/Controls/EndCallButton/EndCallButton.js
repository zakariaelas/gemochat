import React from 'react';
import { ROLES } from '../../../constants';
import EndCallButtonInterviewee from './EndCallButtonInterviewee';
import EndCallButtonInterviewer from './EndCallButtonInterviewer';
import { useAuth } from '../../AuthProvider/AuthProvider';

const EndCallButton = () => {
  const { user } = useAuth();
  if (user.role === ROLES.INTERVIEWER)
    return <EndCallButtonInterviewer />;
  else {
    return <EndCallButtonInterviewee />;
  }
};

export default EndCallButton;
