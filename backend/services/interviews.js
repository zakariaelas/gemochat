const db = require('../db');
const redisClient = require('redis').createClient();
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const { InterviewNotFound } = require('../errors');
const STATUS = require('../enums/interviewStatus');
const RATINGS = require('../enums/ratings');
const { generateScorecardRatingFromQuestions } = require('../utils/helpers');
const { greenhouseChannel } = require('../subscribers/channels');
const faker = require('faker');
const harvestService = require('./harvest');

const getInterviews = async (id) => {
  const interviews = await db.Interview.find({ interviewer: id }).sort({
    date: 'desc',
  });
  return interviews;
};

const createInterview = async (data) => {
  const key = uuidv4();
  const { application_id } = data;
  const {
    candidate_id,
    job_id,
    job_name,
  } = await harvestService.getApplication(application_id);

  let { questions, scorecard } = await db.Job.findOne({ job_id });
  questions = questions.map((q) => q.toObject());
  scorecard = scorecard.map((s) => s.toObject());

  const interview = await db.Interview.create({
    key,
    ...data,
    questions,
    scorecard,
    candidate_id,
    candidate_name: faker.name.findName(),
    job_id,
    job_name,
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

const isInterviewValid = async (key) => {
  const interview = await db.Interview.findOne({ key });
  return !!interview;
};

const isInterviewerOfInterview = async (userId, key) => {
  const interview = await db.Interview.findOne({ key });
  return interview && interview.interviewer.toString() === userId;
};

const submitAssessment = async (key, data) => {
  let status = STATUS.AWAITING_ASSESSMENT;
  const { overall_rating } = data;
  if (overall_rating && overall_rating !== RATINGS.NO_DECISION)
    status = STATUS.COMPLETED;
  // As we push in a new array with every submission. We need to preserve the attributes ids
  // This is important because this will preserve the question attribute mappings.
  // If the following line is removed, on each submission, new ids get assigned to attributes .. thus breaking the question mappings.
  data.scorecard = data.scorecard.map((s) => ({ ...s, _id: s.id }));

  let interview = await db.Interview.findOneAndUpdate(
    { key },
    { $set: { ...data, status } },
    { new: true },
  ).populate({ path: 'interviewer', select: 'displayName' });
  // Once the overall rating is submitted, we publish a message to redis so that our scraping worker can submit to greenhouse
  if (status === STATUS.COMPLETED) {
    redisClient.publish(
      `${greenhouseChannel}`,
      JSON.stringify({
        type: 'submit_assessment',
        ...interview.toObject(),
        interviewer: interview.interviewer.displayName,
      }),
    );
  }
  return interview;
};

const getInterviewScoresFromQuestions = async (key, questions) => {
  const attributesMap = generateScorecardRatingFromQuestions(questions);
  // Return an array of scores instead of an object
  const attributes = _.values(attributesMap);
  return attributes;
};

const getCandidateInformation = async (key) => {
  let interview = await db.Interview.findOne({
    key,
  });
  if (!interview) throw new InterviewNotFound();
  const { keyed_custom_fields } = await harvestService.getApplication(
    interview.application_id,
  );
  return {
    candidate_name: interview.candidate_name,
    keyed_custom_fields,
  };
};

module.exports = {
  createInterview,
  isInterviewValid,
  getInterview,
  submitAssessment,
  getInterviews,
  getInterviewScoresFromQuestions,
  isInterviewerOfInterview,
  getCandidateInformation,
};
