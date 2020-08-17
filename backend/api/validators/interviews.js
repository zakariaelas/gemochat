const validate = require('./validate');
const { body, param } = require('express-validator');
const RATINGS = require('../../enums/ratings');

const validateCreateInterview = validate([
  body('date').exists().isISO8601().withMessage('Invalid date'),
  body('application_id')
    .exists()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Invalid application_id'),
]);

const validateQuestions = validate([
  body('questions').exists().isArray().withMessage('Invalid questions'),
  body('questions.*.id')
    .exists()
    .isString()
    .isMongoId()
    .withMessage('Invalid question id'),
  body('questions.*.note')
    .exists()
    .isString()
    .trim()
    .withMessage('Invalid question note'),
  body('questions.*.rating')
    .exists()
    .customSanitizer((value) => (value ? value : RATINGS.NO_DECISION))
    .isIn([
      RATINGS.MIXED,
      RATINGS.NO,
      RATINGS.STRONG_NO,
      RATINGS.STRONG_YES,
      RATINGS.YES,
      RATINGS.NO_DECISION,
    ])
    .withMessage('Invalid question rating'),
]);

const validateKeyParam = validate([
  param('key').exists().isString().withMessage('Invalid key'),
]);

const validatePatchInterview = validate([
  body('takeAways').exists().isString().withMessage('Invalid notes'),
  body('questions').exists().isArray().withMessage('Invalid questions'),
  body('questions.*.id')
    .exists()
    .isString()
    .isMongoId()
    .withMessage('Invalid question id'),
  body('questions.*.note')
    .exists()
    .isString()
    .trim()
    .withMessage('Invalid question note'),
  body('questions.*.rating')
    .exists()
    .customSanitizer((value) => (value ? value : RATINGS.NO_DECISION))
    .isIn([
      RATINGS.MIXED,
      RATINGS.NO,
      RATINGS.STRONG_NO,
      RATINGS.STRONG_YES,
      RATINGS.YES,
      RATINGS.NO_DECISION,
    ])
    .withMessage('Invalid question rating'),
  body('scorecard').exists().isArray().withMessage('Invalid questions'),
  body('scorecard.*.id')
    .exists()
    .isString()
    .isMongoId()
    .withMessage('Invalid scorecard id'),
  body('scorecard.*.name')
    .exists()
    .isString()
    .trim()
    .withMessage('Invalid scorecard name'),
  body('scorecard.*.type')
    .exists()
    .isString()
    .trim()
    .withMessage('Invalid scorecard type'),
  body('scorecard.*.note')
    .exists()
    .isString()
    .trim()
    .withMessage('Invalid scorecard note'),
  body('scorecard.*.rating')
    .exists()
    .customSanitizer((value) => (value ? value : RATINGS.NO_DECISION))
    .isIn([
      RATINGS.MIXED,
      RATINGS.NO,
      RATINGS.STRONG_NO,
      RATINGS.STRONG_YES,
      RATINGS.YES,
      RATINGS.NO_DECISION,
    ])
    .withMessage('Invalid scorecard rating'),
  body('overall_rating')
    .exists()
    .customSanitizer((value) => (value ? value : RATINGS.NO_DECISION))
    .isIn([
      RATINGS.MIXED,
      RATINGS.NO,
      RATINGS.STRONG_NO,
      RATINGS.STRONG_YES,
      RATINGS.YES,
      RATINGS.NO_DECISION,
    ])
    .withMessage('Invalid overall rating'),
]);

module.exports = {
  validateCreateInterview,
  validateKeyParam,
  validatePatchInterview,
  validateQuestions,
};
