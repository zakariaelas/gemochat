const CustomError = require('./CustomError');

class InterviewNotFound extends CustomError {
  name = 'InterviewNotFound';
  status = 404;

  constructor(message = 'Interview not found') {
    super(message);
  }
}

module.exports = InterviewNotFound;
