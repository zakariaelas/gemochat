/**
 *  This service is used to hit the Harvest API endpoints.
 *  Currently, this is used to submit an interview assessment to greenhouse.
 *  The getHarvestScorecards method is not yet used in our interface
 */

const config = require('../config');
const axios = require('axios');
const { ApplicationNotFound } = require('../errors/');
const token = Buffer.from(`${config.harvest.apiKey}:`).toString('base64');
axios.defaults.headers.common['Authorization'] = `Basic ${token}`;
const BASE_URL = `https://harvest.greenhouse.io/v1`;

const getHarvestScorecards = async (applicationId) => {
  const response = await axios({
    method: 'GET',
    url: `${BASE_URL}/applications/${applicationId}/scorecards`,
  });
  const [harvestScorecard] = response.data;
  const scorecards = harvestScorecard.attributes.map(({ name, type }) => ({
    name,
    type,
  }));
  const questions = harvestScorecard.questions.map(({ id, question }) => ({
    id,
    question,
  }));
  return { scorecards, questions };
};

const getApplication = async (applicationId) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/applications/${applicationId}/`,
    });
    const { candidate_id, jobs } = response.data;
    // Always returns an array containing only one job.
    const job = jobs[0];
    return {
      candidate_id,
      job_name: job.name,
      job_id: job.id,
    };
  } catch (err) {
    if (err.response) {
      // Then axios error
      if (err.response.status === 404) {
        throw new ApplicationNotFound();
      }
    }
    throw err;
  }
};

module.exports = {
  getHarvestScorecards,
  getApplication,
};
