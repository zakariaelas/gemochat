const api = require('./api');
const config = require('./config');
const logger = require('./utils/logger');
const server = require('http').Server(api);
require('./subscribers');

server.listen(config.port, function () {
  logger.info(`Server is starting on port ${config.port}`);
});
