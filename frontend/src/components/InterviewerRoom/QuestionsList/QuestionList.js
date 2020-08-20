import React from 'react';
import { Box, List, makeStyles } from '@material-ui/core';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import QuestionListDroppable from './QuestionListDroppable/QuestionListDroppable';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '100%',
  },
  list: {
    maxHeight: 615,
    overflowY: 'auto',
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'none',
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar': {
      width: 6,
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.secondary.light,
      border: `1px solid ${theme.palette.secondary.light}`,
      borderRadius: 32,
    },
  },
  helperText: {
    color: theme.palette.blueGrey[500],
    fontWeight: 500,
  },
}));

const QuestionList = ({ questionIds, updateQuestionIds }) => {
  const classes = useStyles();

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    const newQuestionIds = questionIds.slice();
    const [removed] = newQuestionIds.splice(source.index, 1);
    newQuestionIds.splice(destination.index, 0, removed);

    updateQuestionIds(newQuestionIds);
  };

  return (
    <Box pt={1}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <List
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={classes.list}
            >
              <QuestionListDroppable questionIds={questionIds} />
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default React.memo(QuestionList);
