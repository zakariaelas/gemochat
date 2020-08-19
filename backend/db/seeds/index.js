const jobSeeder = require('./job');
const userSeeder = require('./user');
const interviewSeeder = require('./interview');
const logger = require('../../utils/logger');

(async () => {
  try {
    await jobSeeder.createJob('4451682002');
    const user = await userSeeder.createUser();
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
  } catch (err) {
    logger.log('error', err.message, { meta: err });
  }
})();
