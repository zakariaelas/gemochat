const interviewsService = require('../../services/interviews');

const getInterviews = async (req, res, next) => {
  try {
    const { id } = req.user;
    const interviews = await interviewsService.getInterviews(id);
    return res.json({ interviews });
  } catch (err) {
    next(err);
  }
};

const createInterview = async (req, res, next) => {
  try {
    const { id } = req.user;
    const interviewDTO = req.body;
    const data = { ...interviewDTO, interviewer: id };
    const interview = await interviewsService.createInterview(data);
    return res.json({ key: interview.key });
  } catch (err) {
    next(err);
  }
};

const isInterviewValid = async (req, res, next) => {
  try {
    const { key } = req.params;
    const valid = await interviewsService.isInterviewValid(key);
    return res.json({ valid });
  } catch (err) {
    next(err);
  }
};

const getInterview = async (req, res, next) => {
  try {
    const { key } = req.params;
    const interview = await interviewsService.getInterview(key);
    return res.json(interview);
  } catch (err) {
    next(err);
  }
};

const submitAssessment = async (req, res, next) => {
  try {
    const { key } = req.params;
    const assessmentDTO = req.body;
    const interview = await interviewsService.submitAssessment(
      key,
      assessmentDTO,
    );
    return res.json(interview);
  } catch (err) {
    next(err);
  }
};

const finishCall = async (req, res, next) => {
  try {
    const { key } = req.params;
    const interview = await interviewsService.finishCall(key);
    return res.json(interview);
  } catch (err) {
    next(err);
  }
};

const getInterviewScoresFromQuestions = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { questions } = req.body;
    const attributes = await interviewsService.getInterviewScoresFromQuestions(
      key,
      questions,
    );
    return res.json({ attributes });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createInterview,
  isInterviewValid,
  getInterview,
  submitAssessment,
  finishCall,
  getInterviews,
  getInterviewScoresFromQuestions,
};
