import {
  LOAD_INTERVIEW,
  UPDATE_QUESTION,
  UPDATE_SCORECARD,
  SET_INTERVIEW_QUESTIONS,
  SET_SELECTED_QUESTION,
  UPDATE_ATTRIBUTES,
  UPDATE_INTERVIEW_STEP,
  UPDATE_QUESTION_IDS,
  UPDATE_INTERVIEW,
} from '../actionTypes';

const reducer = (state, action) => {
  switch (action.type) {
    case LOAD_INTERVIEW:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_INTERVIEW:
      return {
        ...state,
        interview: { ...state.interview, ...action.payload },
      };
    case UPDATE_QUESTION_IDS:
      return updateQuestionIds(state, action);
    case UPDATE_QUESTION:
      return updateQuestion(state, action);
    case UPDATE_SCORECARD:
      return updateScorecard(state, action);
    case SET_INTERVIEW_QUESTIONS:
      return {
        ...state,
        interview: {
          ...state.interview,
          questions: action.questions,
        },
      };
    case SET_SELECTED_QUESTION:
      return {
        ...state,
        selectedQuestionIndex: action.questionIndex,
      };
    case UPDATE_ATTRIBUTES:
      return updateAttributes(state, action);
    case UPDATE_INTERVIEW_STEP:
      return {
        ...state,
        interviewStep: action.interviewStep,
      };
    default:
      return state;
  }
};

const updateQuestion = (state, action) => {
  const { questionId, payload } = action;
  const newQuestion = {
    ...state.questions[questionId],
    ...payload,
  };
  return {
    ...state,
    questions: { ...state.questions, [questionId]: newQuestion },
  };
};

const updateScorecard = (state, action) => {
  const { attributeId, payload } = action;
  const newAttribute = {
    ...state.scorecard[attributeId],
    ...payload,
  };
  return {
    ...state,
    scorecard: { ...state.scorecard, [attributeId]: newAttribute },
  };
};

const updateAttributes = (state, action) => {
  const { attributes } = action;
  const newAttributes = attributes.reduce(
    (obj, { attribute_id, note, rating }) => {
      obj[attribute_id] = {
        ...state.scorecard[attribute_id],
        note,
        rating,
      };
      return obj;
    },
    {},
  );
  return {
    ...state,
    scorecard: { ...state.scorecard, ...newAttributes },
  };
};

const updateQuestionIds = (state, action) => {
  const newQuestions = action.questionIds;
  return {
    ...state,
    interview: { ...state.interview, questions: newQuestions },
  };
};

export default reducer;
