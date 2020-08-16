const { UnexpectedError, CustomError } = require('../../errors/');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const { status } = err;
    res.status(status).json({ error: err.serializeError() });
  } else {
    console.error(err);
    const unexpectedError = new UnexpectedError(err);
    res
      .status(unexpectedError.status)
      .json({ error: unexpectedError.serializeError() });
  }
};

module.exports = errorHandler;
