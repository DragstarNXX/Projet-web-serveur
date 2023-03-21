const express = require("express");
const expressOasGenerator = require("express-oas-generator");
const { setupLogging } = require("./configs/logging");
const { routes } = require("./application/routes");

const app = express();
const port = process.env.API_PORT || 8080;
const rootDir = __dirname;

setupLogging(app, rootDir);

const { passport } = require("./application/middlewares/passport");

expressOasGenerator.handleResponses(app, {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({
    message: "Api Rest avec express, sequelize, mysql",
    documentation: `app listening at http://localhost:${port}/api-docs`,
  });
});

app.use(routes);

//
app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "You have accessed a protected route" });
  }
);

expressOasGenerator.handleRequests();

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
