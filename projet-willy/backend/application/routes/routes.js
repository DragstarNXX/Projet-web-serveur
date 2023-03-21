const express = require("express");

const authController = require("../controllers/auth");
const rolesController = require("../controllers/roles");
const usersController = require("../controllers/users");
const automobilesController = require("../controllers/automobiles");

const router = express.Router();

// route for authentication
router.route("/auth/login").post(authController.login);

// route for fetching roles
router.route("/roles").get(rolesController.getRoles);

// route for fetching users
router.route("/users").get(usersController.getUsers);
router.route("/users/:id").get(usersController.getUserById);
router.route("/users").post(usersController.create);
router.route("/users/:id").delete(usersController.remove);
router.route("/users/:id").put(usersController.update);

// route for fetching authomobiles
router.route("/automobiles").get(automobilesController.getAutomobiles);
router.route("/automobiles/:id").get(automobilesController.getAutomobileById);
router.route("/automobiles").post(automobilesController.create);
router.route("/automobiles/:id").delete(automobilesController.remove);
router.route("/automobiles/:id").put(automobilesController.update);

exports.routes = router;
