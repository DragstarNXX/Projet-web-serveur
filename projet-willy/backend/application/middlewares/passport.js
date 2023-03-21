const passport = require("passport");
const { Users } = require("../modeles/models");
const { jwtOptions } = require("../utils");
const JWTStrategy = require("passport-jwt").Strategy;

passport.use(
  new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
    return Users.findOne({ where: { email: jwtPayload.user.email } })
      .then((user) => {
        return cb(null, user);
      })
      .catch((err) => {
        return cb(err);
      });
  })
);

exports.passport = passport;
