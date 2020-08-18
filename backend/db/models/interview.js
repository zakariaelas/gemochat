const mongoose = require('mongoose');
const questionSchema = require('./question');
const attributeSchema = require('./attribute');
const RATINGS = require('../../enums/ratings');
const STATUS = require('../../enums/interviewStatus');

const interviewSchema = new mongoose.Schema(
  {
    interviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    interview_type: {
      type: String,
      required: true,
    },
    candidate_id: {
      type: String,
      required: true,
    },
    candidate_name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    job_id: {
      type: String,
      required: true,
    },
    job_name: {
      type: String,
      required: true,
    },
    application_id: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    takeAways: {
      type: String,
      default: '',
    },
    questions: [questionSchema],
    scorecard: [attributeSchema],
    overall_rating: {
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
    status: {
      type: String,
      default: STATUS.SCHEDULED,
      enum: [STATUS.SCHEDULED, STATUS.AWAITING_ASSESSMENT, STATUS.COMPLETED],
    },
  },
  { timestamps: true },
);

interviewSchema.index({ job_id: 1 });
interviewSchema.index({ key: 1 });

const Interview = new mongoose.model('Interview', interviewSchema);

module.exports = Interview;
