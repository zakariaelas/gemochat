const validate = require('./validate');
const { body } = require('express-validator');
const { capitalizeString } = require('./sanitizers');

const validateSignUp = validate([
  body('displayName')
    .exists()
    .isString()
    .trim()
    .customSanitizer(capitalizeString)
    .withMessage('Invalid full name'),
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email')
    .trim(),
  body('password')
    .exists()
    .isString()
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must contain at least 8 characters'),
  body('phoneNumber')
    .exists()
    .isString()
    .matches(/^(\+?212|0)[67]\d{8}$/)
    .withMessage('Invalid phoneNumber'),
]);

module.exports = {
  validateSignUp,
};
