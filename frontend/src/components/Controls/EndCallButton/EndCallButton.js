import React from 'react';
import useCurrentUserContext from '../../../hooks/useCurrentUserContext';
import { ROLES } from '../../../constants';
import EndCallButtonInterviewee from './EndCallButtonInterviewee';
import EndCallButtonInterviewer from './EndCallButtonInterviewer';

const EndCallButton = () => {
  const { currentUser } = useCurrentUserContext();
  if (
    currentUser.isAuthenticated &&
    currentUser.role === ROLES.INTERVIEWER
  )
    return <EndCallButtonInterviewer />;
  else {
    return <EndCallButtonInterviewee />;
  }
};

export default EndCallButton;
