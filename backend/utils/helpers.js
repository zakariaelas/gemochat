const NUMERICAL_RATINGS = require('../enums/numericalRatings');

// Utility function used to get the closest rating to the numerical score generated
// e.g: Used to convert a 4.2666 to a 'Yes'
const getClosestRatingToNumericalScore = (score) => {
  const arr = Object.values(NUMERICAL_RATINGS);
  const closest = arr.reduce((acc, curr) =>
    Math.abs(acc - score) < Math.abs(curr - score) ? acc : curr,
  );
  return Object.keys(NUMERICAL_RATINGS).find(
    (key) => NUMERICAL_RATINGS[key] === closest,
  );
};

const generateScorecardRatingFromQuestions = (questions) => {
  let attributes = {};
  for (let i = 0; i < questions.length; i++) {
    let { rating, note } = questions[i];
    // Continue to next iteration if there is not attribute
    if (!questions[i].attributes) continue;
    // Iterate through question attributes and compute weighted sum for each.
    for (let j = 0; j < questions[i].attributes.length; j++) {
      let { attribute_name, attribute_id, weight = 1 } = questions[
        i
      ].attributes[j];
      // if the attribute is seen for the first time, add it to the attributes map.
      if (!attributes[attribute_id])
        attributes[attribute_id] = {
          weighted_sum: 0,
          sumOfWeights: 0,
          note: '',
          attribute_name,
        };
      attributes[attribute_id].weighted_sum +=
        NUMERICAL_RATINGS[rating] * weight;
      attributes[attribute_id].sumOfWeights += weight;
      attributes[attribute_id].note += note ? note + '\n' : '';
    }
  }
  for (const [
    key,
    { attribute_name, note, weighted_sum, sumOfWeights },
  ] of Object.entries(attributes)) {
    attributes[key] = {
      attribute_id: key,
      attribute_name,
      note,
      rating: getClosestRatingToNumericalScore(weighted_sum / sumOfWeights),
    };
  }
  return attributes;
};

module.exports = {
  getClosestRatingToNumericalScore,
  generateScorecardRatingFromQuestions,
};
