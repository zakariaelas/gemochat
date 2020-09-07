const db = require('../index');
var jobsSeed = require('./jobs.json');

const createJobs = async () => {
  return Promise.all(await jobsSeed.jobs.map((job) => createJob(job)));
};

const createJob = async (jobSeed) => {
  let job = await db.Job.create({
    ...jobSeed,
    questions: [],
  });

  const scorecardByName = job
    .toObject()
    .scorecard.reduce(
      (acc, curr) => ({ ...acc, [curr.name]: { ...curr } }),
      {},
    );

  let questions = jobSeed.questions.map((q) => ({
    ...q,
    attributes: q.attributes.map((attribute) => ({
      ...attribute,
      attribute_id: scorecardByName[attribute.attribute_name]._id,
    })),
  }));

  job = await db.Job.findOneAndUpdate(
    { job_id: job._id },
    { $set: { questions } },
    { new: true },
  );
  return job;
};

module.exports = {
  createJobs,
};
