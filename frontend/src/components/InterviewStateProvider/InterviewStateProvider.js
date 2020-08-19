import React, { createContext, useCallback, useEffect } from 'react';
import useGenerateScores from './useGenerateScores';
import _ from 'lodash';
import { useQuery } from 'react-query';
import useInterviewReducer from './useInterviewReducer/useInterviewReducer';
import { useParams } from 'react-router-dom';
import api from '../../api';
import RoomSkeleton from '../RoomSkeleton/RoomSkeleton';
import { denormalize } from 'normalizr';
import { interview as interviewSchema } from './schemas/interview';
import useSaveAssessment from './useSaveAssessment';

export const InterviewStateContext = createContext(null);

export const InterviewStateProvider = ({ children }) => {
  const { meetingId } = useParams();
  const [state, dispatch, actions] = useInterviewReducer();
  const {
    data,
    isLoading: isLoadingInterview,
    isFetching,
  } = useQuery(
    ['interviewhhh', { key: meetingId }],
    api.getInterviewNormalized,
  );

  useEffect(() => {
    if (data) actions.loadInterview(data);
  }, [data]);

  const [
    generateScoresAPI,
    { isLoading: isLoadingScores },
  ] = useGenerateScores();

  const [
    saveAssessmentMutation,
    { isLoading: isLoadingSaveAssessment },
  ] = useSaveAssessment();

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

  const saveAssessment = useCallback(async () => {
    const assessment = denormalize(
      state.interview,
      interviewSchema,
      state,
    );
    console.log(assessment);
    await saveAssessmentMutation({
      key: meetingId,
      data: assessment,
    });
  });

  return (
    <InterviewStateContext.Provider
      value={{
        ...state,
        ...actions,
        isLoadingInterview,
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

// useEffect(() => {
//   const onKeyDown = (ev) => {
//     if (ev.target.tagName.toUpperCase() !== 'BODY') return;
//     if (ev.key === 'ArrowLeft') {
//       //left arrow
//       prev();
//     } else if (ev.key === 'ArrowRight') {
//       //right arrow
//       next();
//     }
//   };
//   document.addEventListener('keydown', onKeyDown);
//   return () => {
//     document.removeEventListener('keydown', onKeyDown);
//   };
// }, [prev, next]);
