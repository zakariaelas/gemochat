const validate = require('./validate');
const { body } = require('express-validator');
const { capitalizeString } = require('./sanitizers');

const validateSignUp = validate([
  body('displayName')
    .exists()
    .isString()
    .trim()
    .notEmpty()
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
]);

const validateUpdateUser = validate([
  body('displayName')
    .exists()
    .isString()
    .trim()
    .notEmpty()
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
    .notEmpty()
    .withMessage('Invalid password'),
  body('newPassword')
    .exists()
    .isString()
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must contain at least 8 characters'),
]);

module.exports = {
  validateSignUp,
  validateUpdateUser,
};
