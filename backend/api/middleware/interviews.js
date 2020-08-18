const { ForbiddenError } = require('../../errors');
const interviewsService = require('../../services/interviews');

const ensureCorrectInterviewer = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { id } = req.user;
    const isInterviewerOfInterview = await interviewsService.isInterviewerOfInterview(
      id,
      key,
    );
    if (!isInterviewerOfInterview) throw new ForbiddenError();
    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  ensureCorrectInterviewer,
};
