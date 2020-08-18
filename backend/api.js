const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const apiRoutes = require('./api/index');
const logger = require('./utils/logger');
if (typeof jest === 'undefined')
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms', {
      stream: logger.stream,
    }),
  );

app.use(helmet());

app.use(express.json());

app.use('/api', apiRoutes);

module.exports = app;
