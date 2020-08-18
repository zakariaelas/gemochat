const winston = require('winston');

const customFormat = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: '[LOGGER]',
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:MM:SS',
  }),
  winston.format.splat(),
  winston.format.printf((info) => {
    if (info.meta && info.meta instanceof Error) {
      info.message = `${info.message} ${info.meta.stack}`;
    }
    return `[${info.timestamp}] [${info.level}] : ${info.message}`;
  }),
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: customFormat,
    }),
  ],
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
