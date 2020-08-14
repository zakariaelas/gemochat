class CustomError extends Error {
  name = 'CustomError';

  constructor(message) {
    super(message);
  }

  serializeError() {
    return { message: this.message, status: this.status };
  }
}

module.exports = CustomError;
