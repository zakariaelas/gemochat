import React from 'react';
import DraggableQuestionItem from '../DraggableQuestionItem/DraggableQuestionItem';

const QuestionListDroppable = React.memo(({ questionIds }) => {
  return questionIds.map((questionId, index) => (
    <DraggableQuestionItem
      questionId={questionId}
      key={questionId}
      index={index}
    />
  ));
});

export default QuestionListDroppable;
