const db = require('../db');
const CredentialsError = require('../errors/CredentialsError');
const bcrypt = require('bcrypt');

const createUser = async (data) => {
  try {
    const user = await db.User.create(data);
    return user;
  } catch (err) {
    throw err;
  }
};

const updateProfile = async (userId, data) => {
  const user = await db.User.findOne({ _id: userId });
  const isMatch = await user.comparePassword(data.password);
  if (!isMatch) throw new CredentialsError();
  const newPassword = await bcrypt.hash(data.newPassword, 10);
  delete data.newPassword;
  const newUser = await db.User.findOneAndUpdate(
    { _id: userId },
    { $set: { ...data, password: newPassword } },
    { new: true },
  );
  return newUser;
};

module.exports = {
  createUser,
  updateProfile,
};
