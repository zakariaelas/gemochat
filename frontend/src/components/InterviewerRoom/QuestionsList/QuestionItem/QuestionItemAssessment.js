import React, { useCallback, useState } from 'react';
import useQuestionItemStyles from './useQuestionItemStyles';
import {
  Box,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  TextField,
} from '@material-ui/core';
import {
  DragIndicator,
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';
import Ratings from '../../../Ratings/Ratings';
import _ from 'lodash';
import useInterviewStateContext from '../../../../hooks/useInterviewStateContext';
import { RATINGS } from '../../../../constants';
import QuestionItemAvatar from './QuestionItemAvatar';

const Component = React.memo(
  React.forwardRef(
    (
      {
        index,
        question,
        onChangeNote,
        onChangeRating,
        dragHandle,
        ...props
      },
      ref,
    ) => {
      const classes = useQuestionItemStyles();

      const isScored =
        question.rating && question.rating !== RATINGS.NO_DECISION;

      const [open, setOpen] = useState();

      return (
        <Box {...props} ref={ref} className={classes.mainBox}>
          <Box display="flex" alignItems="center">
            <Box className={classes.icon} {...dragHandle}>
              <DragIndicator color="primary" />
            </Box>
            <ListItem
              classes={{ root: classes.listItemRoot }}
              button
              onClick={() => {
                setOpen((open) => !open);
              }}
            >
              <QuestionItemAvatar index={index} isScored={isScored} />
              <ListItemText
                primary={`${question.text}`}
                primaryTypographyProps={{
                  className: classes.listItemTextPrimary,
                }}
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          </Box>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box pl={2} pr={1} py={0.5}>
              <Typography variant="body2" color="textSecondary">
                Ratings
              </Typography>
              <Ratings
                size="small"
                value={question.rating}
                onChange={onChangeRating}
              />
              <Typography
                color="textSecondary"
                variant="body2"
                gutterBottom
              >
                Note
              </Typography>
              <TextField
                variant="outlined"
                value={question.note}
                size="small"
                fullWidth
                style={{ fontSize: '0.875rem' }}
                onChange={onChangeNote}
                multiline
                rows={3}
              />
            </Box>
          </Collapse>
        </Box>
      );
    },
  ),
);

const QuestionItemAssessment = (
  { index, questionId, ...props },
  ref,
) => {
  const { questions, updateQuestion } = useInterviewStateContext();

  const question = questions[questionId];

  const onChangeRating = useCallback(
    (value) => {
      updateQuestion(questionId, { rating: value });
    },
    [updateQuestion, questionId],
  );

  const onChangeNote = useCallback(
    (ev) => {
      const note = ev.target.value;
      updateQuestion(questionId, { note });
    },
    [updateQuestion, questionId],
  );

  return (
    <Component
      ref={ref}
      onChangeNote={onChangeNote}
      onChangeRating={onChangeRating}
      index={index}
      question={question}
      {...props}
    />
  );
};

export default React.forwardRef(QuestionItemAssessment);
