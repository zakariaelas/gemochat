import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import useGenerateScores from './useGenerateScores';
import _ from 'lodash';
import { useQuery } from 'react-query';
import useInterviewReducer from './useInterviewReducer/useInterviewReducer';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../api';
import RoomSkeleton from '../RoomSkeleton/RoomSkeleton';
import { denormalize } from 'normalizr';
import { interview as interviewSchema } from './schemas/interview';
import useSaveAssessment from './useSaveAssessment';
import { INTERVIEW_STEP } from '../../constants';

/**
 * Why normalize the API response?
 * The idea here is that when we send an API request to generate the scores from the questions...
 * ... We will need to look for every changed attribute in order to "patch" the calculated score.
 * Normalization will solve this issue as we can simply access the attributes by their ids.
 * Note however, that this problem is not relevant if we choose to fetch the scores automatically instead of waiting...
 * ... for the user to trigger an action.
 *
 */

export const InterviewStateContext = createContext(null);

export const InterviewStateProvider = ({ children }) => {
  const { key } = useParams();
  const history = useHistory();
  const shouldSaveToLocalStorage = useRef(true);
  const unloadHandlerRef = useRef(() => {});
  const initialState = JSON.parse(
    localStorage.getItem(`interview-${key}`),
  );
  const [state, dispatch, actions] = useInterviewReducer(
    initialState,
  );
  const { isFetching, refetch } = useQuery(
    ['interview', { key }],
    api.getInterviewNormalized,
    {
      onSuccess: (data) => {
        actions.loadInterview(data);
      },
      enabled: false,
    },
  );

  const [
    generateScoresAPI,
    { isLoading: isLoadingScores },
  ] = useGenerateScores();

  const [
    saveAssessmentMutation,
    { isLoading: isLoadingSaveAssessment },
  ] = useSaveAssessment();

  useEffect(() => {
    if (!initialState) refetch();
  }, [initialState]);

  // Save the current state of the interview to local storage.
  // Disruptions are expected in calls and users' intuition is probably to refresh the page
  // The goal is not to lose the state of the interview (questions' scores etc.) on refresh
  useEffect(() => {
    unloadHandlerRef.current = () => {
      if (shouldSaveToLocalStorage.current) {
        localStorage.setItem(
          `interview-${key}`,
          JSON.stringify({
            ...state,
            interviewStep: INTERVIEW_STEP.CALL,
          }),
        );
      }
    };
  }, [state]);

  useEffect(() => {
    const unloadHandler = (ev) => {
      unloadHandlerRef.current(ev);
    };
    window.addEventListener('beforeunload', unloadHandler);

    return history.listen(() => {
      unloadHandlerRef.current();
      window.removeEventListener('beforeunload', unloadHandler);
    });
  }, []);

  // Callback when an interviewer chooses to generate scores from questions.
  const generateScores = useCallback(
    async (key) => {
      const questions = _.values(state.questions);
      const { attributes } = await generateScoresAPI({
        key,
        data: { questions },
      });
      actions.updateAttributes(attributes);
    },
    [actions, generateScoresAPI, state.questions],
  );

  // Saving the assessment on the server.
  // Denormalization needs to occur before sending the data.
  const saveAssessment = useCallback(async () => {
    const assessment = denormalize(
      state.interview,
      interviewSchema,
      state,
    );
    await saveAssessmentMutation({
      key: key,
      data: assessment,
    });
    localStorage.removeItem(`interview-${key}`);
    shouldSaveToLocalStorage.current = false;
  });

  return (
    <InterviewStateContext.Provider
      value={{
        ...state,
        ...actions,
        isLoadingInterview: isFetching,
        isLoadingScores,
        isLoadingSaveAssessment,
        generateScores,
        saveAssessment,
      }}
    >
      {isFetching ? <RoomSkeleton /> : children}
    </InterviewStateContext.Provider>
  );
};

export default InterviewStateProvider;
