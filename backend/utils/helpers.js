const NUMERICAL_RATINGS = require('../enums/numericalRatings');
const numericalRatings = require('../enums/numericalRatings');

const getRatingFromNumericalScore = (score) => {
  const arr = Object.values(NUMERICAL_RATINGS);
  const result = arr.reduce((acc, curr) =>
    Math.abs(acc - score) < Math.abs(curr - score) ? acc : curr,
  );
  return Object.keys(NUMERICAL_RATINGS).find(
    (key) => NUMERICAL_RATINGS[key] === result,
  );
};

const generateScorecardRatingFromQuestions = (questions) => {
  let attributes = {};
  for (let i = 0; i < questions.length; i++) {
    let { rating, note } = questions[i];
    if (!questions[i].attributes) {
      continue;
    }
    for (let j = 0; j < questions[i].attributes.length; j++) {
      let { attribute_name, attribute_id, weight = 1 } = questions[
        i
      ].attributes[j];
      if (!attributes[attribute_id])
        attributes[attribute_id] = {
          weighted_sum: 0,
          sumOfWeights: 0,
          note: '',
          attribute_name,
        };
      attributes[attribute_id].weighted_sum +=
        numericalRatings[rating] * weight;
      attributes[attribute_id].sumOfWeights += weight;
      attributes[attribute_id].note += note ? note + '\n' : '';
    }
  }
  Object.keys(attributes).forEach((k) => {
    attributes[k] = {
      attribute_id: k,
      attribute_name: attributes[k].attribute_name,
      note: attributes[k].note,
      rating: getRatingFromNumericalScore(
        attributes[k].weighted_sum / attributes[k].sumOfWeights,
      ),
    };
  });
  return attributes;
};

module.exports = {
  getRatingFromNumericalScore,
  generateScorecardRatingFromQuestions,
};
