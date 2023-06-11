const express = require("express");

const {
  authorizedImageExtensions,
  authorizedVideoExtensions,
} = require("../../utils/authorized.file.extensions");

const validateUpload = require("../../middleware/validate.upload");
const validateSchema = require("../../middleware/validate.schema");
const validateId = require("../../middleware/validate.id");

const Projects = require("./projects.model");

const projectController = require("./projects.controller");

const projectRouter = express.Router();

projectRouter.get("/", projectController.getAllProjects);
projectRouter.get("/:id", validateId, projectController.getProjectById);
projectRouter.post(
  "/",
  validateUpload("preview", [
    ...authorizedImageExtensions,
    ...authorizedVideoExtensions,
  ]),
  validateSchema(Projects.schema),
  projectController.createProject
);
projectRouter.put("/:id", validateId, projectController.updateProject);
projectRouter.delete("/:id", validateId, projectController.deleteProject);

module.exports = projectRouter;
