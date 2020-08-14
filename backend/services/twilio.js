const config = require('../config');
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const getTwilioAccessToken = async (identity, roomName) => {
  const token = new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKeySid,
    config.twilio.apiKeySecret,
    {
      ttl: config.twilio.maxAllowedSessionDuration,
    },
  );
  token.identity = identity;
  const videoGrant = new VideoGrant({ room: roomName });
  token.addGrant(videoGrant);
  return token.toJwt();
};

module.exports = {
  getTwilioAccessToken,
};
