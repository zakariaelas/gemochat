const api = require('./api');
const config = require('./config');
const logger = require('./utils/logger');
const server = require('http').Server(api);

server.listen(config.port, function () {
  logger.info(`Server is starting on port ${config.port}`);
});
