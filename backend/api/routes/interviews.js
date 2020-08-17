const router = require('express').Router();

const {
  createInterview,
  isInterviewValid,
  getInterview,
  submitAssessment,
  getInterviewScoresFromQuestions,
  getInterviews,
} = require('../controllers/interviews');

const { loginRequired, ensureInterviewer } = require('../middleware/auth');

const { ensureCorrectInterviewer } = require('../middleware/interviews');

const {
  validateCreateInterview,
  validateKeyParam,
  validatePatchInterview,
  validateQuestions,
} = require('../validators/interviews');

const { sanitizeReqBody } = require('../validators/sanitizers');

router
  .route('/')
  .get(loginRequired, ensureInterviewer, getInterviews)
  .post(
    loginRequired,
    ensureInterviewer,
    validateCreateInterview,
    sanitizeReqBody,
    createInterview,
  );

router
  .route('/:key')
  .get(
    loginRequired,
    ensureInterviewer,
    validateKeyParam,
    validateKeyParam,
    getInterview,
  );

router.route('/:key/valid').get(validateKeyParam, isInterviewValid);

router
  .route('/:key/scoring')
  .post(
    loginRequired,
    ensureInterviewer,
    ensureCorrectInterviewer,
    validateKeyParam,
    validateQuestions,
    getInterviewScoresFromQuestions,
  );

router
  .route('/:key/assessment')
  .post(
    loginRequired,
    ensureInterviewer,
    validateKeyParam,
    validatePatchInterview,
    sanitizeReqBody,
    submitAssessment,
  );

module.exports = router;
