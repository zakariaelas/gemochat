const jobSeeder = require('./jobs');
const userSeeder = require('./users');
const interviewSeeder = require('./interview');
const logger = require('../../utils/logger');

(async () => {
  try {
    const jobs = await jobSeeder.createJobs();
    const user = await userSeeder.createUsers();
    await interviewSeeder.createInterview(
      {
        job_id: '4451682002',
        job_name: 'Playground Job',
        candidate_id: '27190588002',
        application_id: '55033188002',
        interview_type: 'Technical Interview',
      },
      user._id,
    );
    logger.info('SEEDING completed');
    process.exit();
  } catch (err) {
    logger.log('error', err.message, { meta: err });
  }
})();
