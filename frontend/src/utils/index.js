import jwtDecode from 'jwt-decode';
import { INTERVIEW_STATUS, INTERVIEW_STEP } from '../constants';

export const isMobile = (() => {
  if (
    typeof navigator === 'undefined' ||
    typeof navigator.userAgent !== 'string'
  ) {
    return false;
  }
  return /Mobile/.test(navigator.userAgent);
})();

export const jwtVerifyAndDecode = (token) => {
  if (token) {
    let jwt = jwtDecode(token);
    let current_time = Date.now().valueOf() / 1000;
    if (jwt.exp < current_time) {
      localStorage.removeItem('token');
      window.location.href = `${process.env.PUBLIC_URL}/`;
      return { isValid: false };
    } else return { isValid: true, payload: jwt };
  }
  return { isValid: false };
};

export const getInterviewStepFromStatus = (status) => {
  switch (status) {
    case INTERVIEW_STATUS.AWAITING_ASSESSMENT:
      return INTERVIEW_STEP.ASSESSMENT;
    case INTERVIEW_STATUS.COMPLETED:
      return INTERVIEW_STEP.ASSESSMENT;
    case INTERVIEW_STATUS.SCHEDULED:
      return INTERVIEW_STEP.CALL;
    default:
      return '';
  }
};
