const { matchedData } = require('express-validator');

const sanitizeReqBody = (req, res, next) => {
  req.body = matchedData(req, {
    locations: ['body'],
    includeOptionals: false,
  });
  next();
};

const capitalizeString = (value) =>
  value
    .split(' ')
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join(' ');

module.exports = {
  sanitizeReqBody,
  capitalizeString,
};
