import React, { useCallback } from 'react';
import useQuestionItemStyles from './useQuestionItemStyles';
import QuestionItemAvatar from './QuestionItemAvatar';
import { Box, ListItem, ListItemText } from '@material-ui/core';
import { DragIndicator } from '@material-ui/icons';
import { RATINGS } from '../../../../constants';
import useInterviewStateContext from '../../../../hooks/useInterviewStateContext';

const Component = React.memo(
  React.forwardRef(
    ({ handleClick, question, index, dragHandle, ...props }, ref) => {
      const classes = useQuestionItemStyles();
      const isScored =
        question.rating && question.rating !== RATINGS.NO_DECISION;
      return (
        <Box {...props} ref={ref} className={classes.mainBox}>
          <Box display="flex" alignItems="center">
            <Box className={classes.icon} {...dragHandle}>
              <DragIndicator color="primary" />
            </Box>
            <ListItem
              classes={{ root: classes.listItemRoot }}
              button
              onClick={handleClick}
            >
              <QuestionItemAvatar index={index} isScored={isScored} />
              <ListItemText
                primary={`${question.text}`}
                primaryTypographyProps={{
                  className: classes.listItemTextPrimary,
                }}
              />
            </ListItem>
          </Box>
        </Box>
      );
    },
  ),
);

const QuestionItemCall = ({ index, questionId, ...props }, ref) => {
  const {
    questions,
    setSelectedQuestionIndex,
  } = useInterviewStateContext();

  const question = questions[questionId];

  const handleClick = useCallback(() => {
    setSelectedQuestionIndex(index);
  }, [setSelectedQuestionIndex, index]);

  return (
    <Component
      question={question}
      index={index}
      handleClick={handleClick}
      ref={ref}
      {...props}
    />
  );
};

export default React.forwardRef(QuestionItemCall);
