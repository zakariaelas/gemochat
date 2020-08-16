class UnexpectedError extends Error {
  status = 500;
  constructor(message = 'Something went wrong') {
    super(message);
  }

  serializeError() {
    return { message: this.message, status: this.status };
  }
}

module.exports = UnexpectedError;
