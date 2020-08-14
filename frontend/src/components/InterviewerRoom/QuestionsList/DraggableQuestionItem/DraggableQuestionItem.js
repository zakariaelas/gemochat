import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import QuestionItem from '../QuestionItem';

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: 'rgb(235,235,235)',
  }),
});

const DraggableQuestionItem = ({ questionId, index }) => {
  return (
    <Draggable draggableId={questionId} index={index}>
      {(provided, snapshot) => (
        <QuestionItem
          questionId={questionId}
          index={index}
          {...provided.draggableProps}
          dragHandle={{ ...provided.dragHandleProps }}
          ref={provided.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
          )}
        />
      )}
    </Draggable>
  );
};

export default DraggableQuestionItem;
