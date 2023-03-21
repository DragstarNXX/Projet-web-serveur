const path = require("path");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");

const setupLogging = (app, rootDir) => {
  app.use(
    morgan("combined", {
      stream: rfs.createStream("access.log", {
        interval: "1d",
        path: path.join(rootDir, "logs"),
      }),
    })
  );
};

module.exports = {
  setupLogging,
};
