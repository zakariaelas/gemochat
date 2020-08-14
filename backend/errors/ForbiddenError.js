const CustomError = require('./CustomError');

class ForbiddenError extends CustomError {
  name = 'ForbiddenError';
  status = 403;

  constructor(message = 'No permissions') {
    super(message);
  }
}

module.exports = ForbiddenError;
