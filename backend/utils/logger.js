const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      json: false,
      colorize: true,
    }),
  ],
});

module.exports = logger;
