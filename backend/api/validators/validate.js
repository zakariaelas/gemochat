const { validationResult } = require('express-validator');
const { RequestValidationError } = require('../../errors');

const errorFormatter = ({ msg }) => ({ message: msg });

const customValidationResult = validationResult.withDefaults({
  formatter: errorFormatter,
});

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = customValidationResult(req);
    if (!errors.isEmpty()) {
      return next(new RequestValidationError(errors.array()));
    }
    return next();
  };
};

module.exports = validate;
