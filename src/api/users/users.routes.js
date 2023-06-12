const express = require("express");
const validateId = require("../../middleware/validate.id");
const validateSchema = require("../../middleware/validate.schema");
const Users = require("./users.model");
const usersController = require("./users.controller");

const usersRouter = express.Router();

usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/:id", validateId, usersController.getUserById);
usersRouter.post("/", validateSchema(Users.schema), usersController.createUser);
usersRouter.put("/:id", validateId, usersController.updateUser);
usersRouter.delete("/:id", validateId, usersController.deleteUser);

module.exports = usersRouter;