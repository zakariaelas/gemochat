const mongoose = require('mongoose');
const questionSchema = require('./question');
const attributeSchema = require('./attribute');

const scorecardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
    attributes: [attributeSchema],
  },
  { timestamps: true },
);

scorecardSchema.index({ job_id: 1 });

const Scorecard = new mongoose.model('Scorecard', scorecardSchema);

module.exports = Scorecard;
