const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    expirationTime: process.env.JWT_EXPIRATION_TIME,
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKeySid: process.env.TWILIO_API_KEY_SID,
    apiKeySecret: process.env.TWILIO_API_KEY_SECRET,
    maxAllowedSessionDuration: process.env.TWILIO_MAX_ALLOWED_SESSION_DURATION,
  },
  harvest: {
    apiKey: process.env.HARVEST_API_KEY,
  },
  greenhouse: {
    email: process.env.GREENHOUSE_EMAIL,
    password: process.env.GREENHOUSE_PASSWORD,
  },
};
