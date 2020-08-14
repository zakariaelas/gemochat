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
const {
  validateCreateInterview,
  validateKeyParam,
  validatePatchInterview,
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
  .get(loginRequired, ensureInterviewer, validateKeyParam, getInterview);

router.route('/:key/valid').get(validateKeyParam, isInterviewValid);

router.route('/:key/scoring').post(
  loginRequired,
  ensureInterviewer,
  validateKeyParam,
  //validate questions
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

// router
//   .route('/:key/start_assessment')
//   .get(ensureInterviewer, validateKeyParam, startAssessment);

module.exports = router;
