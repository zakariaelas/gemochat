const db = require('../db');
const { CredentialsError } = require('../errors');

const authUser = async (email, password) => {
  const user = await db.User.findOne({ email });
  if (!user) throw new CredentialsError();
  const isMatch = await user.comparePassword(password);
  if (isMatch) return user;
  // throw error if no match
  throw new CredentialsError();
};

module.exports = {
  authUser,
};
