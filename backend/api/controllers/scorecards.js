const harvestService = require('../../services/harvest');

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
