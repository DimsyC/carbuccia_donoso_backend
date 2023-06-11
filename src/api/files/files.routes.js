const express = require("express");

const filesController = require("./files.controller");

const fileRouter = express.Router();

fileRouter.get("/:id", filesController.getFileById);



module.exports = fileRouter;
