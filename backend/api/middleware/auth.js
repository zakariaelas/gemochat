const passport = require('passport');
const jwt = require('jsonwebtoken');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const config = require('../../config/');
const { ForbiddenError, CredentialsError } = require('../../errors/');
const db = require('../../db');
const ROLES = require('../../enums/roles');

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret,
  },
  (jwt_payload, done) => {
    done(null, jwt_payload);
  },
);

passport.use(jwtStrategy);

const jwtOptions = {
  expiresIn: config.jwt.expirationTime,
};

const createToken = (user) => {
  return jwt.sign(user, config.jwt.secret, jwtOptions);
};

const requireAuthWithPredicate = (pred) => (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, payload) => {
    try {
      if (err) throw err;
      if (!payload) return next(new CredentialsError('Please log in'));
      const { id } = payload;
      const user = await db.User.findById(id);
      const predCheck = await pred.check(user, req);
      if (predCheck) {
        req.user = user;
        return next();
      } else return next(new ForbiddenError(pred.message));
    } catch (e) {
      next(e);
    }
  })(req, res, next);
};

module.exports = {
  createToken,
  requireAuthWithPredicate,
  loginRequired: requireAuthWithPredicate({ check: () => true }),
  ensureCorrectUser: requireAuthWithPredicate({
    check: (user, req) => user._id.toString() === req.params.uid,
    message: 'Needs permission',
  }),
  ensureInterviewer: requireAuthWithPredicate({
    check: (user, req) => user.role === ROLES.INTERVIEWER,
    message: 'Needs permission',
  }),
};
