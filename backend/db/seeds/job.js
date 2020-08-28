const db = require('../index');

const createJob = async (job_id) => {
  let attributes = [
    {
      name: 'Version Control',
      type: 'Software Engineering',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Understands French ',
      type: 'Culture-fit',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Understands English ',
      type: 'Culture-fit',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Tool Knowledge',
      type: 'Passion',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Team work ',
      type: 'Culture-fit',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Startup mindset and product sense ',
      type: 'Culture-fit',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Speaks French ',
      type: 'Culture-fit',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Speaks English ',
      type: 'Culture-fit',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Self awareness and coacheability',
      type: 'Culture-fit',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Remote',
      type: 'Culture-fit',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Problem Decomposition',
      type: 'Programming',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Platform Internals',
      type: 'Passion',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Languages Exposed to',
      type: 'Passion',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Knowledge of upcoming technologies',
      type: 'Passion',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Humbleness and eagerness to learn',
      type: 'Culture-fit',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Error Handling',
      type: 'Programming',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Code Readability',
      type: 'Programming',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Code Organization',
      type: 'Programming',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Clear communication and idea structure',
      type: 'Culture-fit',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Build Automation',
      type: 'Software Engineering',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Books & Blogs',
      type: 'Passion',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Autonomy and ownership ',
      type: 'Culture-fit',
      note: '',
      rating: 'no_decision',
    },
    {
      name: 'Automated Testing',
      type: 'Software Engineering',
      note: '',
      rating: 'no_decision',
    },
  ];

  let job = await db.Job.create({
    job_id,
    questions: [],
    scorecard: attributes,
  });

  const scorecardByName = job
    .toObject()
    .scorecard.reduce(
      (acc, curr) => ({ ...acc, [curr.name]: { ...curr } }),
      {},
    );

  let questions = [
    {
      text: 'What is the Virtual DOM?',
      attributes: [
        {
          attribute_id: scorecardByName['Platform Internals']._id,
          attribute_name: 'Platform Internals',
        },
        {
          attribute_id: scorecardByName['Tool Knowledge']._id,
          attribute_name: 'Tool Knowledge',
        },
      ],
    },
    {
      text: 'Why do we use JavaScript frameworks?',
      attributes: [
        {
          attribute_id: scorecardByName['Platform Internals']._id,
          attribute_name: 'Platform Internals',
        },
        {
          attribute_id: scorecardByName['Tool Knowledge']._id,
          attribute_name: 'Tool Knowledge',
        },
      ],
    },
    {
      text: 'What is the difference between async await and promises?',
      attributes: [
        {
          attribute_id: scorecardByName['Platform Internals']._id,
          attribute_name: 'Platform Internals',
        },
        {
          attribute_id: scorecardByName['Tool Knowledge']._id,
          attribute_name: 'Tool Knowledge',
        },
      ],
    },
    {
      text: 'What does an async function return in JavaScript?',
      attributes: [
        {
          attribute_id: scorecardByName['Platform Internals']._id,
          attribute_name: 'Platform Internals',
        },
        {
          attribute_id: scorecardByName['Tool Knowledge']._id,
          attribute_name: 'Tool Knowledge',
        },
        {
          attribute_id: scorecardByName['Languages Exposed to']._id,
          attribute_name: 'Languages Exposed to',
          weight: 0.5,
        },
      ],
    },
    {
      text: 'What is the purpose of CI/CD?',
      attributes: [
        {
          attribute_id: scorecardByName['Build Automation']._id,
          attribute_name: 'Build Automation',
        },
        {
          attribute_id: scorecardByName['Automated Testing']._id,
          attribute_name: 'Automated Testing',
        },
      ],
    },
    'Can you tell me about one of your side projects?',
    'When would you choose to use Typescript over JavaScript?',
    {
      text: 'What would you change in Javascript?',
      attributes: [
        {
          attribute_id: scorecardByName['Languages Exposed to']._id,
          attribute_name: 'Languages Exposed to',
          weight: 0.25,
        },
      ],
    },
    'Can you tell me a bit about the event loop?',
    'What do you know about microtask queues in JavaScript?',
  ];

  questions = questions.map((q) => (q.text ? q : { text: q }));

  job = await db.Job.findOneAndUpdate(
    { job_id: job.job_id },
    { $set: { questions } },
    { new: true },
  );
  return job;
};

const updateJob = async (job_id) => {
  let questions = [
    {
      text: 'What is the Virtual DOM?',
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
    'Can you tell me about one of your side projects?',
    'When would you choose to use Typescript over JavaScript?',
    {
      text: 'What would you change in Javascript?',
      attributes: [
        {
          attribute_id: '5f2c158446289852da7ed12b',
          attribute_name: 'Languages Exposed to',
          weight: 0.25,
        },
      ],
    },
    'Can you tell me a bit about the event loop?',
    'What do you know about microtask queues in JavaScript?',
  ];

  let job = await db.Job.findOneAndUpdate(
    { job_id },
    { $set: { questions: questions.map((q) => (q.text ? q : { text: q })) } },
    { new: true },
  );
  return job;
};

module.exports = {
  createJob,
  updateJob,
};
