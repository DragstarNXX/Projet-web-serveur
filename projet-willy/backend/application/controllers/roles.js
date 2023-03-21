const { Roles } = require("../modeles/models");

async function getRoles(req, res) {
  try {
    return res.status(200).json({
      status: "success",
      data: await Roles.findAll(),
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: error.message,
    });
  }
}

module.exports = {
  getRoles,
};
