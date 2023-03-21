const { Sequelize, DataTypes } = require("sequelize");
const databaseConfig = require("../../configs/database");

const sequelize = new Sequelize(databaseConfig);

// Définir la table "users"
const Users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  prenom: {
    type: DataTypes.STRING,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  naissance: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Définir la table "roles"
const Roles = sequelize.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    values: ["admin", "secretaire", "technicien"],
  },
});

// Définir la table "vendeur"
const Vendeur = sequelize.define("vendeur", {});

// Définir la table "automobile"
const Automobile = sequelize.define("automobile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  annee: {
    type: DataTypes.DATE,
  },
  marque: {
    type: DataTypes.STRING,
  },
  modele: {
    type: DataTypes.STRING,
  },
  prixAffiche: {
    type: DataTypes.DECIMAL,
  },
  kilometrage: {
    type: DataTypes.INTEGER,
  },
});

// We defined relations between les tables
Users.hasMany(Vendeur);
Roles.hasMany(Vendeur);
Vendeur.belongsTo(Users);
Vendeur.belongsTo(Roles);

sequelize.sync();

module.exports = { Users, Roles, Vendeur, Automobile };
