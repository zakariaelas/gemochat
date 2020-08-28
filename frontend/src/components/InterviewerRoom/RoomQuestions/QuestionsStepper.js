import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Typography,
  makeStyles,
  Divider,
  TextField,
} from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import useStepper from '../../../hooks/useStepper';
import { useFormikContext } from 'formik';
import Ratings from '../../Ratings/Ratings';
import useInterviewStateContext from '../../../hooks/useInterviewStateContext';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    boxShadow:
      '0 3px 6px hsla(0,0%, 0%, .15), 0 2px 4px hsla(0, 0%, 0%, .12)',
    backgroundColor: theme.palette.primary.light,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  iconButtonDisabled: {
    color: 'white',
    background: 'rgba(0,0,0,0.2)',
  },
  helperText: {
    fontWeight: 700,
    color: theme.palette.blueGrey[500],
  },
}));

const QuestionsStepper = () => {
  const classes = useStyles();
  const {
    questions,
    interview: { questions: questionIds },
    selectedQuestionIndex,
    updateQuestion,
  } = useInterviewStateContext();
  const [
    activeStep, // source of truth of stepper
    { prev, next, canPrev, canNext, size, goto },
  ] = useStepper(questionIds.length);

  // Only update the active step when selectedQuestionIndex changes.
  // The index can be changed when a user clicks on a question in the QuestionList component
  // As of now, no need to update the selectedQuestionIndex from this component.
  useEffect(() => {
    goto(selectedQuestionIndex);
  }, [selectedQuestionIndex, goto]);

  useEffect(() => {
    const onKeyDown = (ev) => {
      if (ev.target.tagName.toUpperCase() !== 'BODY') return;
      if (ev.key === 'ArrowLeft') {
        //left arrow
        prev();
      } else if (ev.key === 'ArrowRight') {
        //right arrow
        next();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [prev, next]);

  const questionId = questionIds[activeStep];
  const question = questions[questionId] || {};

  const onChangeRating = useCallback(
    (rating) => {
      updateQuestion(questionId, { rating });
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
    <Box display="flex">
      <Box flexBasis="50%" pb={1}>
        <Box pt={0.5} display="flex" alignItems="center">
          <Box mr={0.2}>
            <IconButton
              disabled={!canPrev}
              size="small"
              classes={{ disabled: classes.iconButtonDisabled }}
              onClick={prev}
              className={classes.iconButton}
            >
              <ArrowBack />
            </IconButton>
          </Box>
          <Box flex="1">
            <Typography align="center" variant="h6" paragraph>
              {question.text}
            </Typography>
            <Typography align="center" variant="body2">
              {activeStep + 1}/{size}
            </Typography>
          </Box>
          <Box mx={0.2}>
            <IconButton
              size="small"
              disabled={!canNext}
              classes={{ disabled: classes.iconButtonDisabled }}
              onClick={next}
              className={classes.iconButton}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>
        <Box mt={0.5} justifyContent="center" display="flex">
          <Ratings
            value={question.rating}
            onChange={onChangeRating}
          />
        </Box>
      </Box>
      <Box mx={2}>
        <Divider orientation="vertical" />
      </Box>
      <Box flex="1">
        <Typography
          variant="body1"
          className={classes.helperText}
          gutterBottom
        >
          Note
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          multiline={true}
          rows={4}
          color="secondary"
          value={question.note}
          onChange={onChangeNote}
        />
      </Box>
    </Box>
  );
};

export default QuestionsStepper;
