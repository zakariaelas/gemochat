const mongoose = require('mongoose');
const RATINGS = require('../../enums/ratings');

const attributeMappingSchema = new mongoose.Schema({
  attribute_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  attribute_name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    default: 1,
  },
});

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
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
  note: {
    type: String,
    default: '',
  },
  attributes: [attributeMappingSchema],
});

module.exports = questionSchema;
