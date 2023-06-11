const express = require("express");
const projectRouter = require("./api/projects/projects.routes");
const fileRouter = require('./api/files/files.routes')
const { port, host } = require("./config");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/files', fileRouter)
app.use("/projects", projectRouter);

// Start the server
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});