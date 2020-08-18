const db = require('../index');
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');
const moment = require('moment');

const createInterview = async (data, userId) => {
  let { questions, scorecard } = await db.Job.findOne({
    job_id: data.job_id,
  });
  questions = questions.map((q) => q.toObject());
  scorecard = scorecard.map((s) => s.toObject());
  const key = uuidv4();
  const interview = await db.Interview.create({
    key,
    ...data,
    interviewer: userId,
    date: moment()
      .add(1, 'days')
      .hours(11)
      .minutes(0)
      .seconds(0)
      .milliseconds(0),
    questions,
    scorecard,
    candidate_name: faker.name.findName(),
  });
};

module.exports = {
  createInterview,
};
