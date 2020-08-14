const { UnexpectedError, CustomError } = require('../../errors/');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const { status } = err;
    res.status(status).json({ error: err.serializeError() });
  } else {
    const unexpectedError = new UnexpectedError(err);
    console.log(unexpectedError);
    res
      .status(unexpectedError.status)
      .json({ error: unexpectedError.serializeError() });
  }
};

module.exports = errorHandler;
