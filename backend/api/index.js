const apirouter = require('express').Router();
const authRoutes = require('./routes/auth');
const twilioRoutes = require('./routes/twilio');
const scorecardsRoutes = require('./routes/scorecards');
const interviewsRoutes = require('./routes/interviews');
const errorHandler = require('./middleware/errors');

apirouter.get('/', (req, res) => {
  res.json({ message: 'API is working !' });
});

apirouter.use('/auth', authRoutes);
apirouter.use('/twilio', twilioRoutes);
apirouter.use('/scorecards', scorecardsRoutes);
apirouter.use('/interviews', interviewsRoutes);

apirouter.use(errorHandler);

module.exports = apirouter;
