const request = require('supertest');
const moment = require('moment');
const jwtDecode = require('jwt-decode');
const RATINGS = require('../enums/ratings');
const ROLES = require('../enums/roles');
const INTERVIEW_STATUS = require('../enums/interviewStatus');
const { v4: uuidv4 } = require('uuid');
let api;
let db;
let config;
let user_token = '';
let user_id = '';
let global_interview;
let jobSeeder;

beforeAll(async () => {
  process.env.DATABASE_URL = 'mongodb://localhost/gemochat_test_db';
  api = require('../api');
  config = require('../config');
  db = require('../db');
  jobSeeder = require('../db/seeds/job');
});

describe('API UP', function () {
  it('checks that the API is up and running', async () => {
    const res = await request(api)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200);
    const response = res.body;
    expect(response.message).toBe('API is working !');
  });
});

describe('User CRUD', () => {
  describe('User Creation', () => {
    describe('Valid Input', () => {
      it('When users provide display name, email, and lengthy password, the account is created', async () => {
        const requestBody = {
          displayName: 'Zakaria Saad El Asri',
          email: 'zakaria@test.com',
          password: 'testacccount123',
        };
        const res = await request(api)
          .post('/api/users/')
          .send(requestBody)
          .expect(200);
        expect(res.body).toHaveProperty('token');
        user_token = res.body.token;
        user_id = res.body.id;
        const token_payload = jwtDecode(res.body.token);
        expect(token_payload).toHaveProperty('id');
        expect(token_payload).not.toHaveProperty('password');
        expect(token_payload.email).toBe(requestBody.email);
        expect(token_payload.role).toBe(ROLES.INTERVIEWER);
        expect(token_payload.displayName).toBe(requestBody.displayName);
        expect(res.body).not.toHaveProperty('password');
      });
    });
    describe('Wrong Input', () => {
      it('When users provide a short password < 8 chars, should throw unprocessable entity error', async () => {
        const requestBody = {
          displayName: 'Short Pass',
          email: 'short_password@test.com',
          password: 'short',
        };
        const res = await request(api)
          .post('/api/users/')
          .send(requestBody)
          .expect(422);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toHaveProperty('message');
      });
    });
  });
  describe('User (Profile) Update', () => {
    describe('Valid Input', () => {
      it('When users submit a display name, email, password, and new password >= 8 chars, should update a user', async () => {
        const requestBody = {
          displayName: 'Zakaria El Asri',
          email: 'zakaria1@test.com',
          password: 'testacccount123',
          newPassword: 'airakaz123',
        };
        const res = await request(api)
          .put(`/api/users/`)
          .set('Authorization', `Bearer ${user_token}`)
          .send(requestBody)
          .expect(200);
        expect(res.body).toHaveProperty('token');
        const token_payload = jwtDecode(res.body.token);
        expect(token_payload).toHaveProperty('id');
        expect(token_payload).not.toHaveProperty('password');
        expect(token_payload.email).toBe(requestBody.email);
        expect(token_payload.role).toBe(ROLES.INTERVIEWER);
        expect(token_payload.displayName).toBe(requestBody.displayName);
        expect(res.body.email).toBe(requestBody.email);
        expect(res.body.role).toBe(ROLES.INTERVIEWER);
        expect(res.body.displayName).toBe(requestBody.displayName);
        expect(res.body).not.toHaveProperty('password');
      });
    });
    describe('Missing or Wrong Inputs', () => {
      it('When users enter a wrong password, should throw a 401 error and not commit updates', async () => {
        const requestBody = {
          displayName: 'Should Not Happen',
          email: 'wrong@test.com',
          password: 'wrong_password',
          newPassword: 'new_password',
        };
        const res = await request(api)
          .put(`/api/users/`)
          .set('Authorization', `Bearer ${user_token}`)
          .send(requestBody)
          .expect(401);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toHaveProperty('message');
      });

      it('When users enters an empty display name, should throw a 422 error and not commit updates', async () => {
        const requestBody = {
          displayName: '',
          email: 'wrong@test.com',
          password: 'airakaz123',
          newPassword: 'airakaz1234',
        };
        const res = await request(api)
          .put(`/api/users/`)
          .set('Authorization', `Bearer ${user_token}`)
          .send(requestBody)
          .expect(422);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toHaveProperty('message');
      });

      it('When users enters an empty email, should throw a 422 error and not commit updates', async () => {
        const requestBody = {
          displayName: 'Should Not Happen',
          email: '',
          password: 'airakaz123',
          newPassword: 'airakaz1234',
        };
        const res = await request(api)
          .put(`/api/users/`)
          .set('Authorization', `Bearer ${user_token}`)
          .send(requestBody)
          .expect(422);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toHaveProperty('message');
      });
    });
  });
});

describe('User Authentication', () => {
  describe('Valid Credentials', () => {
    it('checks that the user can login', async () => {
      const body = {
        email: 'zakaria1@test.com',
        password: 'airakaz123',
      };
      const res = await request(api)
        .post('/api/auth/login')
        .send(body)
        .expect(200);
      expect(res.body).toHaveProperty('token');
      let token = jwtDecode(res.body.token);
      expect(token).toHaveProperty('email');
      expect(token).toHaveProperty('role');
      expect(token).toHaveProperty('displayName');
      expect(token).toHaveProperty('id');
      const { displayName, email, role } = token;
      expect(displayName).toBe('Zakaria El Asri');
      expect(email).toBe(body.email);
      expect(role).toBe(ROLES.INTERVIEWER);
    });
  });
  describe('Wrong Credentials', () => {
    it('checks that the user cannot login', async () => {
      const body = {
        email: 'zakaria1@test.com',
        password: 'wrong_password',
      };
      const res = await request(api)
        .post('/api/auth/login')
        .send(body)
        .expect(401);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toHaveProperty('message');
    });
  });
});

describe('Interview CRUD', () => {
  describe('Create Interview', () => {
    describe('Valid Input', () => {
      it('When users enter an application_id and date, should create an interview', async () => {
        await jobSeeder.createJob('4451682002');
        const interview = {
          candidate_id: '52034186002',
          date: moment()
            .add(1, 'days')
            .hours(11)
            .minutes(0)
            .seconds(0)
            .millisecond(0)
            .toISOString(),
          job_id: '4451682002',
          application_id: '57980652002',
          interview_type: 'Technical Interview',
        };
        const body = {
          date: interview.date,
          application_id: interview.application_id,
          interview_type: interview.interview_type,
        };
        const res = await request(api)
          .post('/api/interviews/')
          .set('Authorization', `Bearer ${user_token}`)
          .send(body)
          .expect(200);
        global_interview = {
          ...res.body,
        };
        expect(res.body.candidate_id).toBe(interview.candidate_id);
        expect(res.body.date).toBe(moment(interview.date).toISOString());
        expect(res.body.job_id).toBe(interview.job_id);
        expect(res.body.application_id).toBe(interview.application_id);
        expect(res.body).toHaveProperty('key');
        expect(res.body).toHaveProperty('candidate_name');
        expect(res.body.status).toBe(INTERVIEW_STATUS.SCHEDULED);
        expect(res.body.job_name).toBe('Playground Job');
      });
    });

    describe('Wrong Input', () => {
      it('When users enter a wrong application_id, should throw a 404 not found error', async () => {
        const body = {
          date: moment()
            .add(1, 'days')
            .hours(11)
            .minutes(0)
            .seconds(0)
            .millisecond(0)
            .toISOString(),
          application_id: '185151561515',
          interview_type: 'Technical Interview',
        };
        const res = await request(api)
          .post('/api/interviews/')
          .set('Authorization', `Bearer ${user_token}`)
          .send(body)
          .expect(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toHaveProperty('message');
      });

      it('When users enter an empty application_id, should throw a 422 error', async () => {
        const body = {
          date: moment()
            .add(1, 'days')
            .hours(11)
            .minutes(0)
            .seconds(0)
            .millisecond(0)
            .toISOString(),
          application_id: '',
          interview_type: 'Technical Interview',
        };
        const res = await request(api)
          .post('/api/interviews/')
          .set('Authorization', `Bearer ${user_token}`)
          .send(body)
          .expect(422);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toHaveProperty('message');
      });

      it('When users enter a wrong date format, should throw a 422 error', async () => {
        const body = {
          date: '2015-31-31',
          application_id: '65416516',
        };
        const res = await request(api)
          .post('/api/interviews/')
          .set('Authorization', `Bearer ${user_token}`)
          .send(body)
          .expect(422);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toHaveProperty('message');
      });

      it('When users enter an empty date, should throw a 422 error', async () => {
        const body = {
          date: '',
          application_id: '65416516',
        };
        const res = await request(api)
          .post('/api/interviews/')
          .set('Authorization', `Bearer ${user_token}`)
          .send(body)
          .expect(422);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toHaveProperty('message');
      });

      it('When users enter an empty interview_type, should throw a 422 error', async () => {
        const body = {
          date: moment()
            .add(1, 'days')
            .hours(11)
            .minutes(0)
            .seconds(0)
            .millisecond(0)
            .toISOString(),
          application_id: '57980652002',
          interview_type: '',
        };
        const res = await request(api)
          .post('/api/interviews/')
          .set('Authorization', `Bearer ${user_token}`)
          .send(body)
          .expect(422);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toHaveProperty('message');
      });
    });
  });

  describe('Read Interview', () => {
    describe('Valid input', () => {
      it('When a user gets an interview by providing a key route param, should return that interview', async () => {
        const res = await request(api)
          .get(`/api/interviews/${global_interview.key}`)
          .set('Authorization', `Bearer ${user_token}`)
          .expect(200);

        expect(res.body.candidate_id).toBe(global_interview.candidate_id);
        expect(res.body.date).toBe(moment(global_interview.date).toISOString());
        expect(res.body.job_id).toBe(global_interview.job_id);
        expect(res.body.application_id).toBe(global_interview.application_id);
        expect(res.body.interview_type).toBe(global_interview.interview_type);
        expect(res.body).toHaveProperty('key');
        expect(res.body).toHaveProperty('candidate_name');
        expect(res.body.status).toBe(INTERVIEW_STATUS.SCHEDULED);
        expect(res.body.job_name).toBe('Playground Job');
      });
    });

    describe('Wrong input', () => {
      it('When a user gets an interview by providing a invalid key route param, should throw 403 forbidden error', async () => {
        const res = await request(api)
          .get(`/api/interviews/${uuidv4()}`)
          .set('Authorization', `Bearer ${user_token}`)
          .expect(403);

        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toHaveProperty('message');
      });
    });
  });

  describe('Interview Validity', () => {
    describe('Valid Input', () => {
      it('When given a correct interview key, should return true', async () => {
        const res = await request(api)
          .get(`/api/interviews/${global_interview.key}/valid`)
          .set('Authorization', `Bearer ${user_token}`)
          .expect(200);

        expect(res.body).toHaveProperty('valid');
        expect(res.body.valid).toBe(true);
      });
    });
    describe('Wrong Input', () => {
      it('When given a wrong interview key, should return false', async () => {
        const res = await request(api)
          .get(`/api/interviews/${uuidv4()}/valid`)
          .set('Authorization', `Bearer ${user_token}`)
          .expect(200);

        expect(res.body).toHaveProperty('valid');
        expect(res.body.valid).toBe(false);
      });
    });
  });

  describe('Interview Scores Generatiion', () => {
    describe('Valid Input', () => {
      it('When given a list of rated questions mapped to attributes, should generate scores for those attributes', async () => {
        const {
          questions,
          ratingsByAttributeId,
        } = require('../db/seeds/questions');

        const res = await request(api)
          .post(`/api/interviews/${global_interview.key}/scoring`)
          .set('Authorization', `Bearer ${user_token}`)
          .send({ questions })
          .expect(200);

        expect(res.body).toHaveProperty('attributes');
        res.body.attributes.forEach((attribute) => {
          expect(attribute).toHaveProperty('attribute_name');
          expect(attribute).toHaveProperty('attribute_id');
          expect(attribute).toHaveProperty('note');
          expect(attribute).toHaveProperty('rating');
          expect(attribute.rating).toBe(
            ratingsByAttributeId[attribute.attribute_id],
          );
        });
      });
    });
  });

  describe('Submit Assessment', () => {
    describe('Valid Input', () => {
      it('When an interview is submitted with an empty overall_rating, should save the interview and update status to "AWAITING_ASSESSMENT"', async () => {
        const {
          attributes,
          attributesByName,
        } = require('../db/seeds/attributes');
        const { questions } = require('../db/seeds/questions');

        const body = {
          takeAways: 'Great candidate !',
          scorecard: attributes,
          overall_rating: '',
          questions,
        };

        const res = await request(api)
          .post(`/api/interviews/${global_interview.key}/assessment`)
          .set('Authorization', `Bearer ${user_token}`)
          .send(body)
          .expect(200);
        expect(res.body).toHaveProperty('scorecard');
        expect(res.body).toHaveProperty('questions');
        expect(res.body.takeAways).toBe(body.takeAways);
        res.body.scorecard.forEach((attribute) => {
          const expectedAttribute = attributesByName[attribute.name];
          expect(attribute.type).toBe(expectedAttribute.type);
          expect(attribute.name).toBe(expectedAttribute.name);
          expect(attribute.note).toBe(expectedAttribute.note);
          expect(attribute.rating).toBe(expectedAttribute.rating);
        });
        expect(res.body.status).toBe(INTERVIEW_STATUS.AWAITING_ASSESSMENT);
      });

      it('When a scorecard, takeAways, and an overall rating is submitted, should update the interview and send a message to redis', async () => {
        const {
          attributes,
          attributesByName,
        } = require('../db/seeds/attributes');
        const { questions } = require('../db/seeds/questions');

        const body = {
          takeAways: 'Great candidate !',
          overall_rating: RATINGS.STRONG_YES,
          scorecard: attributes,
          questions,
        };

        const res = await request(api)
          .post(`/api/interviews/${global_interview.key}/assessment`)
          .set('Authorization', `Bearer ${user_token}`)
          .send(body)
          .expect(200);
        expect(res.body).toHaveProperty('scorecard');
        expect(res.body).toHaveProperty('questions');
        expect(res.body.overall_rating).toBe(body.overall_rating);
        expect(res.body.takeAways).toBe(body.takeAways);
        res.body.scorecard.forEach((attribute) => {
          const expectedAttribute = attributesByName[attribute.name];
          expect(attribute.type).toBe(expectedAttribute.type);
          expect(attribute.name).toBe(expectedAttribute.name);
          expect(attribute.note).toBe(expectedAttribute.note);
          expect(attribute.rating).toBe(expectedAttribute.rating);
        });
        expect(res.body.status).toBe(INTERVIEW_STATUS.COMPLETED);
      });
    });
  });
});

describe('Twilio Access Token', () => {
  describe('Valid Input', () => {
    it('When an interview key and a display name are provided, should return an access token', async () => {
      const queryParams = {
        display_name: 'test user',
        key: global_interview.key,
      };
      const res = await request(api)
        .get(
          `/api/twilio/token?key=${queryParams.key}&display_name=${queryParams.display_name}`,
        )
        .expect(200);
      expect(res.body).toHaveProperty('accessToken');
      let accessToken = jwtDecode(res.body.accessToken);
      const { sub, iss, grants } = accessToken;
      expect(sub).toBe(config.twilio.accountSid);
      expect(iss).toBe(config.twilio.apiKeySid);
      expect(grants).toHaveProperty('identity');
      expect(grants).toHaveProperty('video');
      expect(grants.identity).toBe(queryParams.display_name);
    });
  });
  describe('Wrong Input', () => {
    it('When a wrong key and a display name are provided, should throw a 404 error', async () => {
      const body = {
        display_name: 'test user',
        key: uuidv4(),
      };
      const res = await request(api)
        .get(`/api/twilio/token?key=${uuidv4()}&display_name=${'test user'}`)
        .expect(404);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toHaveProperty('message');
    });
  });
});

afterAll(async (done) => {
  db.connection.db.dropDatabase();
  db.connection.close();
  done();
});
