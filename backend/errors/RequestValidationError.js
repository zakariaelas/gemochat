const CustomError = require('./CustomError');

class RequestValidationError extends CustomError {
  name = 'RequestValidationError';
  status = 422;
  constructor(errors, message = 'Unprocessable Entity') {
    super(message);
    this.errors = errors;
  }
  serializeError() {
    return {
      message: this.errors[0].message,
      status: this.status,
    };
  }
}

module.exports = RequestValidationError;
