const db = require('../index');
var userSeed = require('./users.json');

const createUsers = async () => {
  return await Promise.all(userSeed.users.map((user) => db.User.create(user)));
};

module.exports = {
  createUsers,
};
