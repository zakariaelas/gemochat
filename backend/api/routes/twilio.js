const express = require('express');
const router = express.Router();
const { getTwilioAccessToken } = require('../controllers/twilio');
const { validateGetAccessToken } = require('../validators/twilio');

router.get('/token', validateGetAccessToken, getTwilioAccessToken);

module.exports = router;
