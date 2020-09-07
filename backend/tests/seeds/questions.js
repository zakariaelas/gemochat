// Test-only seed. The below questions are scored to mimic a real-life scenario where an interview scores...
// ... different the questions based on a candidate's performance.

const RATINGS = require('../../enums/ratings');

let questions = [
  {
    text: 'What is the Virtual DOM?',
    rating: 'strong_yes',
    note: 'What problems does it solve?',
    attributes: [
      {
        attribute_id: '5f2c158446289852da7ed12a',
        attribute_name: 'Platform Internals',
      },
      {
        attribute_id: '5f2c158446289852da7ed122',
        attribute_name: 'Tool Knowledge',
      },
    ],
  },
  {
    text: 'Why do we use JavaScript frameworks?',
    rating: 'yes',
    note: 'Is it necessary to use one?',
    attributes: [
      {
        attribute_id: '5f2c158446289852da7ed12a',
        attribute_name: 'Platform Internals',
      },
      {
        attribute_id: '5f2c158446289852da7ed122',
        attribute_name: 'Tool Knowledge',
      },
    ],
  },
  {
    text: 'What is the difference between async await and promises?',
    rating: 'strong_no',
    note: '',
    attributes: [
      {
        attribute_id: '5f2c158446289852da7ed12a',
        attribute_name: 'Platform Internals',
      },
      {
        attribute_id: '5f2c158446289852da7ed122',
        attribute_name: 'Tool Knowledge',
      },
    ],
  },
  {
    text: 'What does an async function return in JavaScript?',
    rating: 'strong_yes',
    note: '',
    attributes: [
      {
        attribute_id: '5f2c158446289852da7ed12a',
        attribute_name: 'Platform Internals',
      },
      {
        attribute_id: '5f2c158446289852da7ed122',
        attribute_name: 'Tool Knowledge',
      },
      {
        attribute_id: '5f2c158446289852da7ed12b',
        attribute_name: 'Languages Exposed to',
        weight: 0.5,
      },
    ],
  },
  {
    text: 'What is the purpose of CI/CD?',
    note: 'Did you ever write tests?',
    rating: 'no',
    attributes: [
      {
        attribute_id: '5f2c158446289852da7ed132',
        attribute_name: 'Build Automation',
      },
      {
        attribute_id: '5f2c158446289852da7ed135',
        attribute_name: 'Automated Testing',
      },
    ],
  },
  {
    text: 'What would you change in Javascript?',
    rating: 'strong_no',
    note: '',
    attributes: [
      {
        attribute_id: '5f2c158446289852da7ed12b',
        attribute_name: 'Languages Exposed to',
        weight: 0.25,
      },
    ],
  },
];

const ratingsByAttributeId = {
  '5f2c158446289852da7ed122': RATINGS.YES,
  '5f2c158446289852da7ed12a': RATINGS.YES,
  '5f2c158446289852da7ed12b': RATINGS.YES,
  '5f2c158446289852da7ed132': RATINGS.NO,
  '5f2c158446289852da7ed135': RATINGS.NO,
};

module.exports = {
  questions,
  ratingsByAttributeId,
};
