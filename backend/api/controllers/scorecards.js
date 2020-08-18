const harvestService = require('../../services/harvest');

// This route is not yet consumed by our frontend, but it can be used to fetch a scorecard template from an application
const getScorecards = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const scorecards = await harvestService.getHarvestScorecards(applicationId);
    return res.json(scorecards);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getScorecards,
};
