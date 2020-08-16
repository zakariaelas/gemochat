const request = require('supertest');
const jwtDecode = require('jwt-decode');
const RATINGS = require('../enums/ratings');
const ROLES = require('../enums/roles');
const INTERVIEW_STATUS = require('../enums/interviewStatus');
const { v4: uuidv4 } = require('uuid');
let api;
let db;
let config;
let user_token = '';
let interview = {};
const getRandomIndices = (length, max) => {
  // var arr = [];
  // while (arr.length < length) {
  //   var r = Math.floor(Math.random() * (max - 1)) + 1;
  //   if (arr.indexOf(r) === -1) arr.push(r);
  // }
  // return arr;
  return [1, 3, 5, 7];
};

beforeAll(async () => {
  process.env.DATABASE_URL = 'mongodb://localhost/gemochat_test_db';
  api = require('../api');
  config = require('../config');
  db = require('../db');
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
          displayName: 'Zakaria El Asri',
          email: 'zakaria@test.com',
          password: 'testacccount123',
        };
        const res = await request(api)
          .post('/api/users/')
          .send(requestBody)
          .expect(200);
        expect(res.body).toHaveProperty('token');
        user_token = res.body.token;
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
          displayName: 'Zakaria Saad El Asri',
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
      expect(displayName).toBe('Zakaria Saad El Asri');
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

describe('Twilio Access Token', () => {
  describe('Valid Input', () => {
    // it('When an interview key and a display name are provided, should return an access token', async () => {
    //   const queryParams = {
    //     display_name: 'test user',
    //     key: uuidv4(),
    //   };
    //   const res = await request(api)
    //     .get(`/api/twilio/token?key=${queryParams.key}&display_name=${queryParams.key}`)
    //     .expect(200);
    //   expect(res.body).toHaveProperty('accessToken');
    //   let accessToken = jwtDecode(res.body.accessToken);
    //   const { sub, iss, grants } = accessToken;
    //   expect(sub).toBe(config.twilio.accountSid);
    //   expect(iss).toBe(config.twilio.apiKeySid);
    //   expect(grants).toHaveProperty('identity');
    //   expect(grants).toHaveProperty('video');
    //   expect(grants.identity).toBe(body.display_name);
    // });
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

// describe('Tests Interview CRUD', () => {
//   it('checks that an interview can be created', async () => {
//     const invalid_body = {
//       candidate_id: '656565',
//     };
//     const invalid_res = await request(api)
//       .post('/api/interviews/')
//       .set('Authorization', `Bearer ${user_token}`)
//       .send(invalid_body)
//       .expect(422);
//     const body = {
//       candidate_id: '656565',
//       job_id: '1',
//     };
//     const res = await request(api)
//       .post('/api/interviews/')
//       .set('Authorization', `Bearer ${user_token}`)
//       .send(body)
//       .expect(200);
//     expect(res.body).toHaveProperty('key');
//     interview = {
//       ...body,
//       key: res.body.key,
//     };
//   });

//   it('checks that an interview can be read', async () => {
//     const wrongKey = uuidv4();
//     const invalid_res = await request(api)
//       .get(`/api/interviews/${wrongKey}/`)
//       .set('Authorization', `Bearer ${user_token}`)
//       .expect(404);
//     expect(invalid_res.body).toHaveProperty('error');
//     expect(invalid_res.body.error).toHaveProperty('status');
//     expect(invalid_res.body.error.status).toBe(404);
//     expect(invalid_res.body.error).toHaveProperty('message');

//     const res = await request(api)
//       .get(`/api/interviews/${interview.key}/`)
//       .set('Authorization', `Bearer ${user_token}`)
//       .expect(200);

//     expect(res.body).toHaveProperty('questions');
//     expect(res.body).toHaveProperty('scorecard');
//     expect(res.body).toHaveProperty('status');
//     expect(res.body).toHaveProperty('key');
//     expect(res.body).toHaveProperty('overall_rating');

//     let {
//       job_id,
//       candidate_id,
//       questions,
//       scorecard,
//       status,
//       overall_rating,
//     } = res.body;

//     expect(job_id).toBe(interview.job_id);
//     expect(candidate_id).toBe(interview.candidate_id);
//     expect(status).toBe(INTERVIEW_STATUS.SCHEDULED);
//     expect(overall_rating).toBe(RATINGS.NO_DECISION);
//     questions.forEach((question) => {
//       expect(question).toHaveProperty('text');
//       expect(question).toHaveProperty('rating');
//       expect(question.rating).toBe(RATINGS.NO_DECISION);
//     });
//     scorecard.forEach((attribute) => {
//       expect(attribute).toHaveProperty('name');
//       expect(attribute).toHaveProperty('type');
//       expect(attribute).toHaveProperty('rating');
//       expect(attribute).toHaveProperty('note');
//       expect(attribute.rating).toBe(RATINGS.NO_DECISION);
//     });
//   });

//   it('checks that an interview can be patched', async () => {
//     const res = await request(api)
//       .get(`/api/interviews/${interview.key}/`)
//       .set('Authorization', `Bearer ${user_token}`)
//       .expect(200);
//     let questions_indices = getRandomIndices(10, res.body.questions.length);
//     const questions = res.body.questions.slice();
//     questions_indices.forEach((index) => {
//       questions[index] = {
//         ...questions[index],
//         rating: RATINGS.NO,
//       };
//     });
//     let scorecard_indices = getRandomIndices(10, res.body.scorecard.length);
//     const scorecard = res.body.scorecard.slice();
//     scorecard_indices.forEach((index) => {
//       scorecard[index] = {
//         ...scorecard[index],
//         rating: RATINGS.MIXED,
//       };
//     });

//     const body = {
//       questions,
//       scorecard,
//       overall_rating: RATINGS.STRONG_NO,
//     };
//     const res_patch = await request(api)
//       .patch(`/api/interviews/${interview.key}/`)
//       .set('Authorization', `Bearer ${user_token}`)
//       .send(body)
//       .expect(200);

//     expect(res_patch.body.job_id).toBe(interview.job_id);
//     expect(res_patch.body.candidate_id).toBe(interview.candidate_id);
//     expect(res_patch.body.status).toBe(INTERVIEW_STATUS.COMPLETED);
//     expect(res_patch.body.overall_rating).toBe(RATINGS.STRONG_NO);
//     questions_indices.forEach((index) => {
//       expect(res_patch.body.questions[index]).toHaveProperty('rating');
//       expect(res_patch.body.questions[index].rating).toBe(RATINGS.NO);
//     });
//     scorecard_indices.forEach((index) => {
//       expect(res_patch.body.scorecard[index]).toHaveProperty('rating');
//       expect(res_patch.body.scorecard[index].rating).toBe(RATINGS.MIXED);
//     });
//   });

//   it('checks that an interview can be validated', async () => {
//     const res_valid = await request(api)
//       .get(`/api/interviews/${interview.key}/valid`)
//       .expect(200);
//     expect(res_valid.body).toHaveProperty('valid');
//     expect(res_valid.body.valid).toBe(true);
//     const wrongKey = uuidv4();
//     const res_not_valid = await request(api)
//       .get(`/api/interviews/${wrongKey}/valid`)
//       .expect(200);
//     expect(res_not_valid.body).toHaveProperty('valid');
//     expect(res_not_valid.body.valid).toBe(false);
//   });

//   it('checks that an interview can be ended', async () => {
//     const res = await request(api)
//       .get(`/api/interviews/${interview.key}/end_call`)
//       .set('Authorization', `Bearer ${user_token}`)
//       .expect(200);
//     expect(res.body).toHaveProperty('status');
//     expect(res.body.status).toBe(INTERVIEW_STATUS.AWAITING_ASSESSMENT);
//   });
// });

afterAll(async (done) => {
  db.connection.db.dropDatabase();
  db.connection.close();
  done();
});
