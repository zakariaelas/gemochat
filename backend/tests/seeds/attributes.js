// Test-only seed. The below attributes are scored to mimic a real-life scenario where an interview scores...
// ... different attributes.

const RATINGS = require('../../enums/ratings');
const _ = require('lodash');

let attributes = [
  {
    name: 'Version Control',
    type: 'Software Engineering',
    note: '',
    rating: RATINGS.YES,
  },
  {
    name: 'Understands French',
    type: 'Culture-fit',
    note: '',
    rating: RATINGS.NO,
  },
  {
    name: 'Understands English',
    type: 'Culture-fit',
    note: '',
    rating: RATINGS.STRONG_YES,
  },
  {
    name: 'Tool Knowledge',
    type: 'Passion',
    note: '',
    rating: RATINGS.STRONG_YES,
  },
  {
    name: 'Team work',
    type: 'Culture-fit',
    note: '',
    rating: RATINGS.YES,
  },
  {
    name: 'Startup mindset and product sense',
    type: 'Culture-fit',
    note: '',
    rating: RATINGS.MIXED,
  },
  {
    name: 'Speaks French',
    type: 'Culture-fit',
    note: '',
    rating: RATINGS.STRONG_NO,
  },
  {
    name: 'Speaks English',
    type: 'Culture-fit',
    note: '',
    rating: RATINGS.STRONG_YES,
  },
  {
    name: 'Self awareness and coacheability',
    type: 'Culture-fit',
    note: '',
    rating: RATINGS.STRONG_YES,
  },
  {
    name: 'Remote',
    type: 'Culture-fit',
    note: '',
    rating: RATINGS.STRONG_YES,
  },
  {
    name: 'Problem Decomposition',
    type: 'Programming',
    note: '',
    rating: RATINGS.YES,
  },
  {
    name: 'Platform Internals',
    type: 'Passion',
    note: '',
    rating: RATINGS.STRONG_YES,
  },
  {
    name: 'Languages Exposed to',
    type: 'Passion',
    note: '',
    rating: RATINGS.YES,
  },
  {
    name: 'Knowledge of upcoming technologies',
    type: 'Passion',
    note: '',
    rating: RATINGS.YES,
  },
  {
    name: 'Humbleness and eagerness to learn',
    type: 'Culture-fit',
    note: '',
    rating: RATINGS.STRONG_YES,
  },
  {
    name: 'Error Handling',
    type: 'Programming',
    note: '',
    rating: RATINGS.YES,
  },
  {
    name: 'Code Readability',
    type: 'Programming',
    note: '',
    rating: RATINGS.YES,
  },
  {
    name: 'Code Organization',
    type: 'Programming',
    note: '',
    rating: RATINGS.YES,
  },
  {
    name: 'Clear communication and idea structure',
    type: 'Culture-fit',
    note: '',
    rating: RATINGS.YES,
  },
  {
    name: 'Build Automation',
    type: 'Software Engineering',
    note: '',
    rating: RATINGS.YES,
  },
  {
    name: 'Books & Blogs',
    type: 'Passion',
    note: '',
    rating: RATINGS.YES,
  },
  {
    name: 'Autonomy and ownership ',
    type: 'Culture-fit',
    note: '',
    rating: RATINGS.YES,
  },
  {
    name: 'Automated Testing',
    type: 'Software Engineering',
    note: '',
    rating: RATINGS.YES,
  },
];

module.exports = {
  attributes,
  attributesByName: attributes.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.name.trim()]: {
        ...curr,
        name: curr.name.trim(),
        type: curr.type.trim(),
      },
    }),
    {},
  ),
};
