class UnexpectedError extends Error {
  status = 500;
  constructor(error, message = 'Something went wrong') {
    super(message);
    this.error = error;
  }

  serializeError() {
    return { message: this.message, status: this.status };
  }
}

module.exports = UnexpectedError;
