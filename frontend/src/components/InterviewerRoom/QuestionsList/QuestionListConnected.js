import React from 'react';
import useInterviewStateContext from '../../../hooks/useInterviewStateContext';
import QuestionList from './QuestionList';

const QuestionListConnected = (props) => {
  const {
    interview: { questions: questionIds },
    updateQuestionIds,
  } = useInterviewStateContext();
  return (
    <QuestionList
      questionIds={questionIds}
      updateQuestionIds={updateQuestionIds}
    />
  );
};

export default QuestionListConnected;
