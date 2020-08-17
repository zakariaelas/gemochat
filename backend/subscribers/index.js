const redis = require('redis');
const redisClient = redis.createClient();
const { greenhouseChannel } = require('./channels');
const greenhouseScraper = require('../greenhouse/');

redisClient.psubscribe(`${greenhouseChannel}*`);

redisClient.on('pmessage', async (pchannel, channel, msg) => {
  if (channel.startsWith(greenhouseChannel)) {
    const interview = JSON.parse(msg);
    await greenhouseScraper.submitAssessment(interview);
  }
  return;
});
