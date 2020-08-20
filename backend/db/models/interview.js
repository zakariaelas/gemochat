const mongoose = require('mongoose');
const questionSchema = require('./question');
const attributeSchema = require('./attribute');
const RATINGS = require('../../enums/ratings');
const STATUS = require('../../enums/interviewStatus');

const interviewSchema = new mongoose.Schema(
  {
    // The interviewer's id
    interviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // e.g: Technical Interview, Culture-Fit, etc.
    interview_type: {
      type: String,
      required: true,
    },
    // The candidate's greenhouse id
    candidate_id: {
      type: String,
      required: true,
    },
    // Fake name generated for privacy reasons.
    candidate_name: {
      type: String,
      required: true,
    },
    // The date of the interview
    date: {
      type: String,
      required: true,
    },
    // Greenhouse job_id.
    job_id: {
      type: String,
      required: true,
    },
    // Greenhouse job_name
    job_name: {
      type: String,
      required: true,
    },
    // Greenhouse application_id
    application_id: {
      type: String,
      required: true,
    },
    // Secure random uuid to identify each interview. This key can be shared with candidates.
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

// Add indices on job_is and key for easy retrievals and "joins"
interviewSchema.index({ job_id: 1 });
interviewSchema.index({ key: 1 });

const Interview = new mongoose.model('Interview', interviewSchema);

module.exports = Interview;
