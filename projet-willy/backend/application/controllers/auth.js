const { Users } = require("../modeles/models");
const { hashSecretKey, generateAccessToken } = require("../utils");

async function login(req, res) {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      res.status(409).json({
        status: "error",
        message: "Données incomplètes pour l'authentification",
      });
      return;
    }

    const user = await Users.findOne({ where: { email } });

    if (!user)
      return res.status(404).json({
        status: "error",
        message: "Invalid User not found",
      });

    if (user.password === hashSecretKey(password)) {
      return res.status(200).json({
        status: "success",
        message: "Login successful",
        token: generateAccessToken(user),
      });
    }

    return res.status(402).json({
      status: "error",
      message: "Invalid credentials",
    });
  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: "Invalid User not found",
    });
  }
}

module.exports = {
  login,
};
