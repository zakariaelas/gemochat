const CustomError = require('./CustomError');

class CredentialsError extends CustomError {
  name = 'CredentialsError';
  status = 401;

  constructor(message = 'Wrong credentials') {
    super(message);
  }
}

module.exports = CredentialsError;
