const { createToken } = require('../middleware/auth');
const authService = require('../../services/auth');

const login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    // The call to authUser will throw an error if credentials do not match.
    let { _id: id, role, displayName } = await authService.authUser(
      email,
      password,
    );

    let token = createToken({
      id,
      role,
      email,
      displayName,
    });

    return res.status(200).json({
      id,
      role,
      email,
      displayName,
      token,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login,
};
