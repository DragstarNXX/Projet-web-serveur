const jwt = require("jsonwebtoken");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { createHash } = require("crypto");
const { config } = require("dotenv");

config();

const hashSecretKey = (value, algorithm = "sha256") => {
  return createHash(algorithm).update(value).digest("hex");
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: hashSecretKey(`${process.env.JWT_SIGN_SECRET}`),
};

const generateAccessToken = (data) => {
  return jwt.sign(
    {
      user: data,
    },
    jwtOptions.secretOrKey,
    {
      expiresIn: new Date(
        Number(process.env.JWT_ACCESS_EXPIRE_IN) ?? 3600
      ).getTime(),
    }
  );
};

const decodeToken = (token) => {
  return jwt.verify(token, hashSecretKey(`${process.env.JWT_SIGN_SECRET}`));
};

module.exports = {
  jwtOptions,
  generateAccessToken,
  hashSecretKey,
  decodeToken,
};
