import { login } from './login';
import {
  createInterview,
  isInterviewValid,
  getInterviewInformation,
  getInterviewNormalized,
  submitAssessment,
  getInterviews,
  getInterviewScore,
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
};
