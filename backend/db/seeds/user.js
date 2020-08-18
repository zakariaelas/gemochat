const db = require('../index');

const createUser = async () => {
  return await db.User.create({
    displayName: 'Test User',
    email: 'test@test.com',
    password: 'testaccount123',
  });
};

module.exports = {
  createUser,
};
