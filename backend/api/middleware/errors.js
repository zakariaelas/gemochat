const { UnexpectedError, CustomError } = require('../../errors/');
const logger = require('../../utils/logger');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const { status } = err;
    res.status(status).json({ error: err.serializeError() });
  } else {
    logger.error(err.message, err);
    const unexpectedError = new UnexpectedError(err);
    res
      .status(unexpectedError.status)
      .json({ error: unexpectedError.serializeError() });
  }
};

module.exports = errorHandler;
