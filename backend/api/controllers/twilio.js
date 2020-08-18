const twilioService = require('../../services/twilio');
const interviewsService = require('../../services/interviews');
const { InterviewNotFound } = require('../../errors');

// This route is used to get the access token, which will later be used with the twilio js sdk to connect to the Twilio servers.
const getTwilioAccessToken = async (req, res, next) => {
  try {
    const { key, display_name } = req.query;
    const isValid = await interviewsService.isInterviewValid(key);
    if (!isValid) throw new InterviewNotFound();
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
