const mongoose = require('mongoose');
const db = require('..');

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
    default: '',
  },
});

const scorecardSchema = new mongoose.Schema(
  {
    job_id: {
      type: String,
      required: true,
    },
    attributes: [attributeSchema],
    overall_rating: {
      type: String,
    },
  },
  { timestamps: true },
);

scorecardSchema.index({ job_id: 1 });

const Scorecard = new mongoose.model('Scorecard', scorecardSchema);

// let attributes = [
//   {
//     name: 'Version Control',
//     type: 'Software Engineering',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Understands French ',
//     type: 'Culture-fit',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Understands English ',
//     type: 'Culture-fit',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Tool Knowledge',
//     type: 'Passion',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Team work ',
//     type: 'Culture-fit',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Startup mindset and product sense ',
//     type: 'Culture-fit',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Speaks French ',
//     type: 'Culture-fit',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Speaks English ',
//     type: 'Culture-fit',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Self awareness and coacheability',
//     type: 'Culture-fit',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Remote',
//     type: 'Culture-fit',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Problem Decomposition',
//     type: 'Programming',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Platform Internals',
//     type: 'Passion',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Languages Exposed to',
//     type: 'Passion',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Knowledge of upcoming technologies',
//     type: 'Passion',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Humbleness and eagerness to learn',
//     type: 'Culture-fit',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Error Handling',
//     type: 'Programming',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Code Readability',
//     type: 'Programming',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Code Organization',
//     type: 'Programming',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Clear communication and idea structure',
//     type: 'Culture-fit',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Build Automation',
//     type: 'Software Engineering',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Books & Blogs',
//     type: 'Passion',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Autonomy and ownership ',
//     type: 'Culture-fit',
//     note: null,
//     rating: 'no_decision',
//   },
//   {
//     name: 'Automated Testing',
//     type: 'Software Engineering',
//     note: null,
//     rating: 'no_decision',
//   },
// ];

// Scorecard.create({
//   job_id: 1,
//   attributes,
//   overall_rating: 'yes',
// });

module.exports = Scorecard;
