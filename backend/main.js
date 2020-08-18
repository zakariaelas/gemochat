const api = require('./api');
const config = require('./config');
const logger = require('./utils/logger');
const server = require('http').Server(api);
require('./subscribers');

// require('./greenhouse/').submitAssessment({
//   takeAways: 'Great candidate !',
//   overall_rating: 'strong_yes',
//   status: 'completed',
//   _id: '5f3af93d8e2a0149f17e9ccf',
//   key: '5657b08b-a437-4616-9236-d11004a2f352',
//   date: '2020-08-18T10:00:00.000Z',
//   application_id: '55033188002',
//   interview_type: 'Technical Interview',
//   interviewer: 'Zakaria El Asri',
//   scorecard: [
//     {
//       note: '',
//       rating: 'yes',
//       _id: '5f3af93e8e2a0149f17e9d26',
//       name: 'Version Control',
//       type: 'Software Engineering',
//     },
//     {
//       note: '',
//       rating: 'no',
//       _id: '5f3af93e8e2a0149f17e9d27',
//       name: 'Understands French',
//       type: 'Culture-fit',
//     },
//     {
//       note: '',
//       rating: 'strong_yes',
//       _id: '5f3af93e8e2a0149f17e9d28',
//       name: 'Understands English',
//       type: 'Culture-fit',
//     },
//     {
//       note: '',
//       rating: 'strong_yes',
//       _id: '5f3af93e8e2a0149f17e9d29',
//       name: 'Tool Knowledge',
//       type: 'Passion',
//     },
//     {
//       note: '',
//       rating: 'yes',
//       _id: '5f3af93e8e2a0149f17e9d2a',
//       name: 'Team work',
//       type: 'Culture-fit',
//     },
//     {
//       note: '',
//       rating: 'mixed',
//       _id: '5f3af93e8e2a0149f17e9d2b',
//       name: 'Startup mindset and product sense',
//       type: 'Culture-fit',
//     },
//     {
//       note: '',
//       rating: 'strong_no',
//       _id: '5f3af93e8e2a0149f17e9d2c',
//       name: 'Speaks French',
//       type: 'Culture-fit',
//     },
//     {
//       note: '',
//       rating: 'strong_yes',
//       _id: '5f3af93e8e2a0149f17e9d2d',
//       name: 'Speaks English',
//       type: 'Culture-fit',
//     },
//     {
//       note: '',
//       rating: 'strong_yes',
//       _id: '5f3af93e8e2a0149f17e9d2e',
//       name: 'Self awareness and coacheability',
//       type: 'Culture-fit',
//     },
//     {
//       note: '',
//       rating: 'strong_yes',
//       _id: '5f3af93e8e2a0149f17e9d2f',
//       name: 'Remote',
//       type: 'Culture-fit',
//     },
//     {
//       note: '',
//       rating: 'yes',
//       _id: '5f3af93e8e2a0149f17e9d30',
//       name: 'Problem Decomposition',
//       type: 'Programming',
//     },
//     {
//       note: '',
//       rating: 'strong_yes',
//       _id: '5f3af93e8e2a0149f17e9d31',
//       name: 'Platform Internals',
//       type: 'Passion',
//     },
//     {
//       note: '',
//       rating: 'yes',
//       _id: '5f3af93e8e2a0149f17e9d32',
//       name: 'Languages Exposed to',
//       type: 'Passion',
//     },
//     {
//       note: '',
//       rating: 'yes',
//       _id: '5f3af93e8e2a0149f17e9d33',
//       name: 'Knowledge of upcoming technologies',
//       type: 'Passion',
//     },
//     {
//       note: '',
//       rating: 'strong_yes',
//       _id: '5f3af93e8e2a0149f17e9d34',
//       name: 'Humbleness and eagerness to learn',
//       type: 'Culture-fit',
//     },
//     {
//       note: '',
//       rating: 'yes',
//       _id: '5f3af93e8e2a0149f17e9d35',
//       name: 'Error Handling',
//       type: 'Programming',
//     },
//     {
//       note: '',
//       rating: 'yes',
//       _id: '5f3af93e8e2a0149f17e9d36',
//       name: 'Code Readability',
//       type: 'Programming',
//     },
//     {
//       note: '',
//       rating: 'yes',
//       _id: '5f3af93e8e2a0149f17e9d37',
//       name: 'Code Organization',
//       type: 'Programming',
//     },
//     {
//       note: '',
//       rating: 'yes',
//       _id: '5f3af93e8e2a0149f17e9d38',
//       name: 'Clear communication and idea structure',
//       type: 'Culture-fit',
//     },
//     {
//       note: '',
//       rating: 'yes',
//       _id: '5f3af93e8e2a0149f17e9d39',
//       name: 'Build Automation',
//       type: 'Software Engineering',
//     },
//     {
//       note: '',
//       rating: 'yes',
//       _id: '5f3af93e8e2a0149f17e9d3a',
//       name: 'Books & Blogs',
//       type: 'Passion',
//     },
//     {
//       note: '',
//       rating: 'yes',
//       _id: '5f3af93e8e2a0149f17e9d3b',
//       name: 'Autonomy and ownership',
//       type: 'Culture-fit',
//     },
//     {
//       note: '',
//       rating: 'yes',
//       _id: '5f3af93e8e2a0149f17e9d3c',
//       name: 'Automated Testing',
//       type: 'Software Engineering',
//     },
//   ],
//   candidate_id: '27190588002',
//   candidate_name: 'Geovanni Luettgen',
//   job_id: '4451682002',
//   job_name: 'Playground Job',
// });

// (async () => {
//   await require('./db/seeds/job').createJob('4451682002');
// })();

server.listen(config.port, function () {
  logger.info(`Server is starting on port ${config.port}`);
});
