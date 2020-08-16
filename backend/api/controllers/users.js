const userService = require('../../services/users');
const { createToken } = require('../middleware/auth');

const createUser = async (req, res, next) => {
  try {
    const userDTO = req.body;
    const { _id: id, displayName, email, role } = await userService.createUser(
      userDTO,
    );
    const token = createToken({
      id,
      role,
      displayName,
      email,
    });
    return res.json({
      id,
      role,
      displayName,
      email,
      token,
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userDTO = req.body;
    const { id: userId } = req.user;
    const {
      _id: id,
      displayName,
      email,
      role,
    } = await userService.updateProfile(userId, userDTO);
    const token = createToken({
      id,
      role,
      displayName,
      email,
    });
    return res.json({
      id,
      role,
      displayName,
      email,
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  updateProfile,
};
