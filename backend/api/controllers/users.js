const userService = require('../../services/users');
const { createToken } = require('../middleware/auth');

const createUser = async (req, res, next) => {
  try {
    const userDTO = req.body;
    const {
      _id: id,
      displayName,
      role,
      imageUrl,
      email,
      phoneNumber,
      active,
    } = await userService.createUser(userDTO);
    const token = createToken({
      id,
      role,
      displayName,
      imageUrl,
      phoneNumber,
      email,
      active,
    });
    return res.json({
      id,
      role,
      displayName,
      imageUrl,
      email,
      token,
      active,
      phoneNumber,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
};
