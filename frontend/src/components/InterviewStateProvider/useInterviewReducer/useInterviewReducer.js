import { useReducer, useCallback } from 'react';
import {
  updateQuestionAction,
  updateAttributeAction,
  setInterviewQuestionsAction,
  setSelectedQuestionIndexAction,
  loadInterviewAction,
  updateAttributesAction,
  updateInterviewStepAction,
  updateQuestionIdsAction,
  updateInterviewAction,
} from '../actions';
import reducer from '../reducers';

const initialStateGlobal = {
  interview: {
    questions: [],
    scorecard: [],
    status: '',
  },
  scorecard: {},
  scorecardByType: {},
  questions: {},
  selectedQuestionIndex: 0,
};

const useInterviewReducer = (initialState) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState || initialStateGlobal,
  );

  const loadInterview = useCallback(
    (interview) => {
      loadInterviewAction(dispatch, interview);
    },
    [dispatch],
  );

  const updateQuestion = useCallback(
    (questionId, question) => {
      updateQuestionAction(dispatch, questionId, question);
    },
    [dispatch],
  );

  const updateQuestionIds = useCallback(
    (questionIds) => {
      updateQuestionIdsAction(dispatch, questionIds);
    },
    [dispatch],
  );

  const updateAttribute = useCallback(
    (attributeId, attribute) => {
      updateAttributeAction(dispatch, attributeId, attribute);
    },
    [dispatch],
  );

  const setInterviewQuestions = useCallback(
    (questions) => {
      setInterviewQuestionsAction(dispatch, questions);
    },
    [dispatch],
  );

  const setSelectedQuestionIndex = useCallback(
    (questionIndex) => {
      setSelectedQuestionIndexAction(dispatch, questionIndex);
    },
    [dispatch],
  );

  const updateAttributes = useCallback(
    (attributes) => {
      updateAttributesAction(dispatch, attributes);
    },
    [dispatch],
  );

  const updateInterviewStep = useCallback(
    (interviewStep) => {
      updateInterviewStepAction(dispatch, interviewStep);
    },
    [dispatch],
  );

  const updateInterview = useCallback(
    (payload) => {
      updateInterviewAction(dispatch, payload);
    },
    [dispatch],
  );

  return [
    state,
    dispatch,
    {
      loadInterview,
      updateQuestion,
      updateAttribute,
      setInterviewQuestions,
      setSelectedQuestionIndex,
      updateAttributes,
      updateInterviewStep,
      updateQuestionIds,
      updateInterview,
    },
  ];
};

export default useInterviewReducer;
