const CustomError = require('./CustomError');

class ApplicationNotFound extends CustomError {
  name = 'ApplicationNotFound';
  status = 404;

  constructor(message = 'Application not found') {
    super(message);
  }
}

module.exports = ApplicationNotFound;
