const Projects = require("./projects.model");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.getAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Projects.getById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createProject = async (req, res) => {
  try {   
    const file = req.file;
    const projectData = req.body;
    const project = await Projects.create(projectData, file);
    res.status(201).json(project);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProject = async (req, res) => {
  try {
    const success = await Projects.update(req.params.id, req.body);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const success = await Projects.delete(req.params.id);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
