const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const STATUS = require('../enums/interviewStatus');
const RATINGS = require('../enums/ratings');
const { InterviewNotFound } = require('../errors');
const { generateScorecardRatingFromQuestions } = require('../utils/helpers');
const _ = require('lodash');

const getInterviews = async (id) => {
  const interviews = await db.Interview.find({ interviewer: id });
  return interviews;
};

const createInterview = async (data) => {
  const key = uuidv4();
  const { job_id } = data;
  let { questions, scorecard } = await db.Job.findOne({ job_id });
  questions = questions.map((q) => q.toObject());
  scorecard = scorecard.map((s) => s.toObject());
  const interview = await db.Interview.create({
    key,
    ...data,
    questions,
    scorecard,
  });

  return interview;
};

const getInterview = async (key) => {
  let interview = await db.Interview.findOne({
    key,
  });
  if (!interview) throw new InterviewNotFound();
  return interview;
};

const putNoteOnQuestion = async (interviewKey, questionId, note) => {
  const interview = await db.Interview.findOneAndUpdate(
    { key: interviewKey, 'questions._id': questionId },
    {
      $set: {
        'questions.$.note': note,
      },
    },
    { new: true },
  );
  return interview;
};

const putNoteOnScorecard = async (interviewKey, attributeId, note) => {
  const interview = await db.Interview.findOneAndUpdate(
    { key: interviewKey, 'scorecard._id': attributeId },
    {
      $set: {
        'scorecard.$.note': note,
      },
    },
    { new: true },
  );
  return interview;
};

const isInterviewValid = async (key) => {
  const interview = await db.Interview.findOne({ key });
  return !!interview;
};

const submitAssessment = async (key, data) => {
  let status = STATUS.AWAITING_ASSESSMENT;
  const { overall_rating } = data;
  if (overall_rating && overall_rating !== RATINGS.NO_DECISION)
    status = STATUS.COMPLETED;
  data.scorecard = data.scorecard.map((s) => ({ ...s, _id: s.id }));
  let interview = await db.Interview.findOneAndUpdate(
    { key },
    { $set: { ...data, status } },
    { new: true },
  );
  return interview;
};

const getInterviewScoresFromQuestions = async (key, questions) => {
  const attributesMap = generateScorecardRatingFromQuestions(questions);
  const attributes = _.values(attributesMap);
  return attributes;
};

module.exports = {
  createInterview,
  isInterviewValid,
  getInterview,
  submitAssessment,
  getInterviews,
  putNoteOnQuestion,
  putNoteOnScorecard,
  getInterviewScoresFromQuestions,
};
