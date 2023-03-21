const { config } = require("dotenv");

config();

module.exports = {
  host: `${process.env.DATABASE_HOST}`,
  port: process.env.DATABASE_LOCAL_PORT ?? 3307,
  username: `${process.env.DATABASE_USER}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  query: {
    raw: true,
  },
};
