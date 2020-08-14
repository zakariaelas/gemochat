const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/users');
const { validateSignUp } = require('../validators/users');
const { sanitizeReqBody } = require('../validators/sanitizers');

router.route('/').post(validateSignUp, sanitizeReqBody, createUser);

module.exports = router;
