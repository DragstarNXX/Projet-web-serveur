const { Automobile } = require("../modeles/models");

async function getAutomobiles(req, res) {
  try {
    return res.status(200).json({
      status: "success",
      data: await Automobile.findAll(),
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: error.message,
    });
  }
}

async function getAutomobileById(req, res) {
  try {
    return res.status(200).json({
      status: "success",
      data: await Automobile.findByPk(req.params.id),
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "L'id du vehicule est invalide",
    });
  }
}

async function create(req, res) {
  try {
    let { annee, marque, modele, prixAffiche, kilometrage } = req.body;
    if (!annee || !marque || !modele) {
      return res.status(409).json({
        status: "error",
        message:
          "Impossible de créer un nouveau vehicule, merci de fournir les informations suivantes annee, marque, modele",
      });
    }

    await Automobile.findOrCreate({
      where: {
        annee: new Date(annee),
        marque,
        modele,
        prixAffiche: parseFloat(prixAffiche),
        kilometrage,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Opération réussie: Vehicule correctement enregistré",
    });
  } catch (error) {
    res.status(409).json({
      status: "error",
      message:
        "Impossible de créer un nouveau vehicule les données fournies sont incomplètes",
    });
    return;
  }
}

async function update(req, res) {
  try {
    let { annee, marque, modele, prixAffiche, kilometrage } = req.body;
    if (!annee || !marque || !modele) {
      return res.status(409).json({
        status: "error",
        message:
          "Impossible de mettre à jour ce vehicule les données fournies sont incomplètes",
      });
    }

    await Automobile.update(
      { annee, marque, modele, prixAffiche, kilometrage },
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
  console.log("yo");
  // try {
  //   await Automobile.destroy({
  //     where: { id: req.params.id },
  //   });

  //   return res.status(204).json({
  //     status: "success",
  //     message: "Suppression effectuée avec succès",
  //   });
  // } catch (error) {
  //   res.status(404).json({
  //     status: "error",
  //     message: "L'id du vehicule est invalide",
  //   });
  // }
}

module.exports = {
  create,
  getAutomobiles,
  getAutomobileById,
  update,
  remove,
};
