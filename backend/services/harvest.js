const config = require('../config');
const axios = require('axios');
const token = Buffer.from(`${config.harvest.apiKey}:`).toString('base64');
axios.defaults.headers.common['Authorization'] = `Basic ${token}`;

const getHarvestScorecards = async (applicationId) => {
  const response = await axios({
    method: 'GET',
    url: `https://harvest.greenhouse.io/v1/applications/${applicationId}/scorecards`,
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

module.exports = {
  getHarvestScorecards,
};
