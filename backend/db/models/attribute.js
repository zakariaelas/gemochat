const mongoose = require('mongoose');
const RATINGS = require('../../enums/ratings');

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: '',
  },
  rating: {
    type: String,
    default: RATINGS.NO_DECISION,
    enum: [
      RATINGS.MIXED,
      RATINGS.NO,
      RATINGS.STRONG_NO,
      RATINGS.STRONG_YES,
      RATINGS.YES,
      RATINGS.NO_DECISION,
    ],
  },
});

module.exports = attributeSchema;
