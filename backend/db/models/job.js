const mongoose = require('mongoose');
const questionSchema = require('./question');
const attributeSchema = require('./attribute');

const jobSchema = new mongoose.Schema(
  {
    job_id: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
    scorecard: [attributeSchema],
  },
  { timestamps: true },
);

jobSchema.index({ job_id: 1 });

const Job = new mongoose.model('Job', jobSchema);

module.exports = Job;
