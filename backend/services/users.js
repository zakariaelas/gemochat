const db = require('../db');

const createUser = async (data) => {
  try {
    const user = await db.User.create(data);
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
};
