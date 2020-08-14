const twilioService = require('../../services/twilio');

const getTwilioAccessToken = async (req, res, next) => {
  try {
    const { key, display_name } = req.query;
    // make sure its a valid key using the interview service.
    const accessToken = await twilioService.getTwilioAccessToken(
      display_name,
      key,
    );
    return res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTwilioAccessToken,
};
