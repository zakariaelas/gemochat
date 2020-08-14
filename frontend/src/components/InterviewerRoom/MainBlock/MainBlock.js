import React, { useMemo } from 'react';
import { INTERVIEW_STEP } from '../../../constants';
import PeerMeeting from '../../PeerMeeting/PeerMeeting';
import Assessment from '../../Assessment/Assessment';
import useInterviewStateContext from '../../../hooks/useInterviewStateContext';

const components = {
  [INTERVIEW_STEP.CALL]: PeerMeeting,
  [INTERVIEW_STEP.ASSESSMENT]: Assessment,
  fallback: () => <>Loading...</>,
};

const MainBlock = (props) => {
  const { interviewStep } = useInterviewStateContext();
  const Component = components[interviewStep || 'fallback'];
  return useMemo(() => <Component {...props} />, [
    interviewStep,
    props,
  ]);
};

export default MainBlock;
