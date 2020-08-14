import {
  UPDATE_QUESTION,
  UPDATE_SCORECARD,
  SET_INTERVIEW_QUESTIONS,
  SET_SELECTED_QUESTION,
  LOAD_INTERVIEW,
  UPDATE_ATTRIBUTES,
  UPDATE_INTERVIEW_STEP,
  UPDATE_INTERVIEW,
  UPDATE_QUESTION_IDS,
} from '../actionTypes';

export const loadInterviewAction = (dispatch, payload) => {
  dispatch({ type: LOAD_INTERVIEW, payload });
};

export const updateQuestionAction = (
  dispatch,
  questionId,
  payload,
) => {
  dispatch({ type: UPDATE_QUESTION, questionId, payload });
};

export const updateAttributeAction = (
  dispatch,
  attributeId,
  payload,
) => {
  dispatch({
    type: UPDATE_SCORECARD,
    attributeId,
    payload,
  });
};

export const setInterviewQuestionsAction = (dispatch, questions) => {
  dispatch({
    type: SET_INTERVIEW_QUESTIONS,
    questions,
  });
};

export const setSelectedQuestionIndexAction = (
  dispatch,
  questionIndex,
) => {
  dispatch({
    type: SET_SELECTED_QUESTION,
    questionIndex,
  });
};

export const updateAttributesAction = (dispatch, attributes) => {
  dispatch({ type: UPDATE_ATTRIBUTES, attributes });
};

export const updateInterviewStepAction = (
  dispatch,
  interviewStep,
) => {
  dispatch({ type: UPDATE_INTERVIEW_STEP, interviewStep });
};

export const updateQuestionIdsAction = (dispatch, questionIds) => {
  dispatch({ type: UPDATE_QUESTION_IDS, questionIds });
};

export const updateInterviewAction = (dispatch, payload) => {
  dispatch({ type: UPDATE_INTERVIEW, payload });
};
