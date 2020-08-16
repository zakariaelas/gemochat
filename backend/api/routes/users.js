const express = require('express');
const router = express.Router();
const { createUser, updateProfile } = require('../controllers/users');
const { validateSignUp, validateUpdateUser } = require('../validators/users');
const { sanitizeReqBody } = require('../validators/sanitizers');
const { loginRequired } = require('../middleware/auth');

router
  .route('/')
  .post(validateSignUp, sanitizeReqBody, createUser)
  .put(loginRequired, validateUpdateUser, sanitizeReqBody, updateProfile);

module.exports = router;
