import axiosInstance from './axiosInstance';
import { normalize } from 'normalizr';
import { interview } from '../components/InterviewStateProvider/schemas/interview';
import { RATINGS } from '../constants';
import { getInterviewStepFromStatus } from '../utils';
import _ from 'lodash';

export const createInterview = (data) => {
  return axiosInstance({
    method: 'POST',
    url: '/interviews/',
    data,
  }).then((res) => res.data);
};

export const isInterviewValid = (_, { key }) => {
  return axiosInstance({
    method: 'GET',
    url: `/interviews/${key}/valid`,
  }).then((res) => res.data);
};

export const getInterviewInformation = (_, { key }) => {
  return axiosInstance({
    method: 'GET',
    url: `/interviews/${key}/`,
  }).then((res) => res.data);
};

export const getInterviewNormalized = (__, { key }) => {
  return axiosInstance({
    method: 'GET',
    url: `/interviews/${key}/`,
  })
    .then((res) => res.data)
    .then((data) => {
      const { entities, result } = normalize(data, interview);
      const scorecardByType = _.mapValues(
        _.groupBy(entities.scorecard, 'type'),
        (arr) => arr.map((att) => att.id),
      );
      return {
        interview: entities.interview[result],
        questions: entities.questions,
        scorecard: entities.scorecard,
        scorecardByType: scorecardByType,
        interviewStep: getInterviewStepFromStatus(
          entities.interview[result].status,
        ),
      };
    });
};

export const submitAssessment = ({ key, data }) => {
  return axiosInstance({
    method: 'POST',
    url: `/interviews/${key}/assessment`,
    data,
  }).then((res) => res.data);
};

export const getInterviews = () => {
  return axiosInstance({
    method: 'GET',
    url: `/interviews/`,
  }).then((res) => res.data);
};

export const getInterviewScore = ({ key, data }) => {
  return axiosInstance({
    method: 'POST',
    url: `/interviews/${key}/scoring`,
    data,
  }).then((res) => res.data);
};
