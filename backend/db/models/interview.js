const mongoose = require('mongoose');
const questionSchema = require('./question');
const attributeSchema = require('./attribute');
const RATINGS = require('../../enums/ratings');
const STATUS = require('../../enums/interviewStatus');
const { getRatingFromNumericalScore } = require('../../utils/helpers');
const { truncate } = require('lodash');

const interviewSchema = new mongoose.Schema(
  {
    interviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    candidate_id: {
      type: String,
      required: true,
    },
    job_id: {
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

interviewSchema.statics.generateScorecardRating = async function (key) {
  let interview = await this.aggregate([
    {
      $match: {
        key,
      },
    },
    {
      $unwind: '$questions',
    },
    {
      $unwind: '$questions.attributes',
    },
    {
      $match: {
        'questions.score': { $ne: 0 },
      },
    },
    {
      $group: {
        _id: '$questions.attributes.name',
        // score: { $sum: '$score' },
        count: { $sum: 1 },
        notes: {
          $push: '$questions.note',
        },
        score: {
          $sum: {
            $multiply: [
              '$questions.score',
              '$questions.attributes.coefficient',
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        count: 1,
        // join all notes of a question under the "note" field of mapped attributes attribute
        note: {
          $reduce: {
            input: '$notes',
            initialValue: '',
            in: {
              $concat: [
                '$$value',
                {
                  $cond: [
                    {
                      $or: [{ $eq: ['$$value', ''] }, { $eq: ['$$this', ''] }],
                    },
                    '',
                    '\n',
                  ],
                },
                '$$this',
              ],
            },
          },
        },
        score: { $divide: ['$score', '$count'] },
      },
    },
  ]);
  const attributes = interview.map((interview) => ({
    ...interview,
    rating: getRatingFromNumericalScore(interview.score),
  }));
  const newInterview = await Promise.all(
    attributes.map((attribute) =>
      this.findOneAndUpdate(
        { key, 'scorecard.name': attribute.name },
        {
          $set: {
            'scorecard.$.note': attribute.note,
            'scorecard.$.rating': attribute.rating,
          },
        },
        { new: true },
      ),
    ),
  );
  return newInterview[newInterview.length - 1];
};

const Interview = new mongoose.model('Interview', interviewSchema);

module.exports = Interview;
