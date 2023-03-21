const { Users } = require("../modeles/models");
const { hashSecretKey } = require("../utils");

async function getUsers(req, res) {
  try {
    return res.status(200).json({
      status: "success",
      data: await Users.findAll(),
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: error.message,
    });
  }
}

async function getUserById(req, res) {
  try {
    return res.status(200).json({
      status: "success",
      data: await Users.findByPk(req.params.id),
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "L'id de l'utilisateur est invalide",
    });
  }
}

async function create(req, res) {
  try {
    let { nom, prenom, password, naissance, email, telephone } = req.body;
    if (!email || !password) {
      res.status(409).json({
        status: "error",
        message:
          "Impossible de créer un nouvel utilisateur, merci de fournir un email et un mot de passe",
      });
      return;
    }

    // const
    await Users.findOrCreate({
      where: {
        nom,
        prenom,
        email,
        password: hashSecretKey(password),
        naissance: new Date(naissance),
        telephone,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Opération réussie: Utilisateur correctement ajouté",
    });
  } catch (error) {
    res.status(409).json({
      status: "error",
      message:
        "Impossible de créer un nouvel utilisateur les données fournies sont incomplètes",
    });
    return;
  }
}

async function update(req, res) {
  try {
    let { nom, prenom, password, naissance, email, telephone } = req.body;
    if (!email || !password || !nom) {
      return res.status(409).json({
        status: "error",
        message:
          "Impossible de mettre à jour cet utilisateur les données fournies sont incomplètes",
      });
    }

    await Users.update(
      {
        nom,
        prenom,
        email,
        password,
        naissance,
        telephone,
      },
      { where: { id: req.params.id } }
    );

    return res.status(204).json({
      status: "success",
      message: "Modification effectuée avec succès",
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "L'id de l'utilisateur est invalide",
    });
  }
}

async function remove(req, res) {
  try {
    await Users.destroy({
      where: { id: req.params.id },
    });

    return res.status(204).json({
      status: "success",
      message: "Suppression effectuée avec succès",
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "L'id de l'utilisateur est invalide",
    });
  }
}

module.exports = {
  create,
  getUsers,
  getUserById,
  update,
  remove,
};
