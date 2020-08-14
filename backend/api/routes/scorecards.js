const router = require('express').Router();
const { getScorecards } = require('../controllers/scorecards');

router.get('/:applicationId', getScorecards);

module.exports = router;
