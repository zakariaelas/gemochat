const winston = require('winston');

winston.addColors({ info: 'blue' });

const colorizer = winston.format.colorize();

const customFormat = winston.format.combine(
  winston.format.label({
    label: '[LOGGER]',
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:MM:SS',
  }),
  winston.format.printf((info) => {
    if (info.meta && info.meta instanceof Error) {
      info.message = `${info.message} ${info.meta.stack}`;
    }
    return colorizer.colorize(
      info.level,
      `${info.label} [${info.timestamp}] [${info.level.toUpperCase()}]: ${
        info.message
      }`,
    );
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
