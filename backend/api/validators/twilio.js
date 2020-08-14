const validate = require('./validate');
const { query } = require('express-validator');

const validateGetAccessToken = validate([
  query('key').exists().isString().trim().withMessage('Invalid key'),
  query('display_name')
    .exists()
    .isString()
    .trim()
    .withMessage('Invalid display name'),
]);

module.exports = {
  validateGetAccessToken,
};
