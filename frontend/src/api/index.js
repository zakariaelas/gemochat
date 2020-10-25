// This files imports and exposes all the function part of our API layer.

import { login } from './login';
import {
  createInterview,
  isInterviewValid,
  getInterviewInformation,
  getInterviewNormalized,
  submitAssessment,
  getInterviews,
  getInterviewScore,
  getCandidateInformation,
} from './interviews';
import { editProfile } from './users';
import { getAccessToken } from './twilio';

export default {
  login,
  createInterview,
  isInterviewValid,
  getAccessToken,
  getInterviewInformation,
  submitAssessment,
  getInterviews,
  getInterviewScore,
  getInterviewNormalized,
  editProfile,
  getCandidateInformation,
};
