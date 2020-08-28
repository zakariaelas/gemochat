import React from 'react';
import useInterviewStateContext from '../../../hooks/useInterviewStateContext';
import { INTERVIEW_STEP } from '../../../constants';
import QuestionItemCall from './QuestionItem/QuestionItemCall';
import QuestionItemAssessment from './QuestionItem/QuestionItemAssessment';

const components = {
  [INTERVIEW_STEP.CALL]: QuestionItemCall,
  [INTERVIEW_STEP.ASSESSMENT]: QuestionItemAssessment,
};

const QuestionItem = (props, ref) => {
  const { interviewStep } = useInterviewStateContext();
  const Component = components[interviewStep];
  return <Component ref={ref} {...props} />;
};

export default React.forwardRef(QuestionItem);
