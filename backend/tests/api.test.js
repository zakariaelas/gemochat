const request = require('supertest');

let api = require('../api');
const db = require('../db');
const jwtDecode = require('jwt-decode');
const config = require('../config');
const RATINGS = require('../enums/ratings');
const ROLES = require('../enums/roles');
const INTERVIEW_STATUS = require('../enums/interviewStatus');
const { v4: uuidv4 } = require('uuid');

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

describe('API Tests', function () {
  it('checks that the API is working', async () => {
    const res = await request(api)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200);
    const response = res.body;
    expect(response.message).toBe('API is working !');
  });
});

// describe('Tests Twilio endpoints', () => {
//   it('checks that the Twilio access token can be generated', async () => {
//     const body = {
//       email: 'test@test.com',
//       roomName: 'test-room',
//     };
//     const res = await request(api)
//       .get('/api/twilio/token')
//       .send(body)
//       .expect(200);
//     expect(res.body).toHaveProperty('accessToken');
//     let accessToken = jwtDecode(res.body.accessToken);
//     expect(accessToken).toHaveProperty('exp');
//     expect(accessToken).toHaveProperty('iat');
//     expect(accessToken).toHaveProperty('iss');
//     expect(accessToken).toHaveProperty('jti');
//     expect(accessToken).toHaveProperty('sub');
//     expect(accessToken).toHaveProperty('grants');
//     const { sub, iss, grants } = accessToken;
//     expect(sub).toBe(config.twilio.accountSid);
//     expect(iss).toBe(config.twilio.apiKeySid);
//     expect(grants).toHaveProperty('identity');
//     expect(grants).toHaveProperty('video');
//     expect(grants.identity).toBe(body.email);
//   });
// });

describe('Tests User Login', () => {
  it('checks that the user can login', async () => {
    const body = {
      email: 'zakaria@gmail.com',
      password: 'zakaria123',
    };
    const res = await request(api)
      .post('/api/auth/login')
      .send(body)
      .expect(200);
    expect(res.body).toHaveProperty('token');
    user_token = res.body.token;
    let token = jwtDecode(res.body.token);
    expect(token).toHaveProperty('exp');
    expect(token).toHaveProperty('iat');
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

describe('Tests Interview CRUD', () => {
  it('checks that an interview can be created', async () => {
    const invalid_body = {
      candidate_id: '656565',
    };
    const invalid_res = await request(api)
      .post('/api/interviews/')
      .set('Authorization', `Bearer ${user_token}`)
      .send(invalid_body)
      .expect(422);
    const body = {
      candidate_id: '656565',
      job_id: '1',
    };
    const res = await request(api)
      .post('/api/interviews/')
      .set('Authorization', `Bearer ${user_token}`)
      .send(body)
      .expect(200);
    expect(res.body).toHaveProperty('key');
    interview = {
      ...body,
      key: res.body.key,
    };
  });

  it('checks that an interview can be read', async () => {
    const wrongKey = uuidv4();
    const invalid_res = await request(api)
      .get(`/api/interviews/${wrongKey}/`)
      .set('Authorization', `Bearer ${user_token}`)
      .expect(404);
    expect(invalid_res.body).toHaveProperty('error');
    expect(invalid_res.body.error).toHaveProperty('status');
    expect(invalid_res.body.error.status).toBe(404);
    expect(invalid_res.body.error).toHaveProperty('message');

    const res = await request(api)
      .get(`/api/interviews/${interview.key}/`)
      .set('Authorization', `Bearer ${user_token}`)
      .expect(200);

    expect(res.body).toHaveProperty('questions');
    expect(res.body).toHaveProperty('scorecard');
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('key');
    expect(res.body).toHaveProperty('overall_rating');

    let {
      job_id,
      candidate_id,
      questions,
      scorecard,
      status,
      overall_rating,
    } = res.body;

    expect(job_id).toBe(interview.job_id);
    expect(candidate_id).toBe(interview.candidate_id);
    expect(status).toBe(INTERVIEW_STATUS.SCHEDULED);
    expect(overall_rating).toBe(RATINGS.NO_DECISION);
    questions.forEach((question) => {
      expect(question).toHaveProperty('text');
      expect(question).toHaveProperty('rating');
      expect(question.rating).toBe(RATINGS.NO_DECISION);
    });
    scorecard.forEach((attribute) => {
      expect(attribute).toHaveProperty('name');
      expect(attribute).toHaveProperty('type');
      expect(attribute).toHaveProperty('rating');
      expect(attribute).toHaveProperty('note');
      expect(attribute.rating).toBe(RATINGS.NO_DECISION);
    });
  });

  it('checks that an interview can be patched', async () => {
    const res = await request(api)
      .get(`/api/interviews/${interview.key}/`)
      .set('Authorization', `Bearer ${user_token}`)
      .expect(200);
    let questions_indices = getRandomIndices(10, res.body.questions.length);
    const questions = res.body.questions.slice();
    questions_indices.forEach((index) => {
      questions[index] = {
        ...questions[index],
        rating: RATINGS.NO,
      };
    });
    let scorecard_indices = getRandomIndices(10, res.body.scorecard.length);
    const scorecard = res.body.scorecard.slice();
    scorecard_indices.forEach((index) => {
      scorecard[index] = {
        ...scorecard[index],
        rating: RATINGS.MIXED,
      };
    });

    const body = {
      questions,
      scorecard,
      overall_rating: RATINGS.STRONG_NO,
    };
    const res_patch = await request(api)
      .patch(`/api/interviews/${interview.key}/`)
      .set('Authorization', `Bearer ${user_token}`)
      .send(body)
      .expect(200);

    expect(res_patch.body.job_id).toBe(interview.job_id);
    expect(res_patch.body.candidate_id).toBe(interview.candidate_id);
    expect(res_patch.body.status).toBe(INTERVIEW_STATUS.COMPLETED);
    expect(res_patch.body.overall_rating).toBe(RATINGS.STRONG_NO);
    questions_indices.forEach((index) => {
      expect(res_patch.body.questions[index]).toHaveProperty('rating');
      expect(res_patch.body.questions[index].rating).toBe(RATINGS.NO);
    });
    scorecard_indices.forEach((index) => {
      expect(res_patch.body.scorecard[index]).toHaveProperty('rating');
      expect(res_patch.body.scorecard[index].rating).toBe(RATINGS.MIXED);
    });
  });

  it('checks that an interview can be validated', async () => {
    const res_valid = await request(api)
      .get(`/api/interviews/${interview.key}/valid`)
      .expect(200);
    expect(res_valid.body).toHaveProperty('valid');
    expect(res_valid.body.valid).toBe(true);
    const wrongKey = uuidv4();
    const res_not_valid = await request(api)
      .get(`/api/interviews/${wrongKey}/valid`)
      .expect(200);
    expect(res_not_valid.body).toHaveProperty('valid');
    expect(res_not_valid.body.valid).toBe(false);
  });

  it('checks that an interview can be ended', async () => {
    const res = await request(api)
      .get(`/api/interviews/${interview.key}/end_call`)
      .set('Authorization', `Bearer ${user_token}`)
      .expect(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toBe(INTERVIEW_STATUS.AWAITING_ASSESSMENT);
  });
});

afterAll(async (done) => {
  db.connection.close();
  done();
});
