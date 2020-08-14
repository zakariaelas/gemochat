import React, { useMemo } from 'react';
import useInterviewStateContext from '../../../hooks/useInterviewStateContext';
import QuestionList from './QuestionList';

const QuestionListMemo = (props) => {
  const {
    interview: { questions: questionIds },
    updateQuestionIds,
  } = useInterviewStateContext();
  return useMemo(
    () => (
      <QuestionList
        questionIds={questionIds}
        updateQuestionIds={updateQuestionIds}
      />
    ),
    [questionIds, updateQuestionIds],
  );
};

export default QuestionListMemo;
