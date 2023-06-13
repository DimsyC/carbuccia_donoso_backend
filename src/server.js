const express = require("express");
const googleOAuthRouter = require("./api/auth/google/google.oauth.routes");
const usersRouter = require("./api/users/users.routes");
const projectRouter = require("./api/projects/projects.routes");
const fileRouter = require("./api/files/files.routes");
const config = require("./config");

const authenticateToken = require('./middleware/authenticate.token')

const app = express();

// Middleware
app.use(express.json());

// Add authentication routes
app.use("/auth", googleOAuthRouter);
app.use("/files", fileRouter);

//Midleware to ensure authentication for all routes below this point
app.use(authenticateToken)

// Routes
app.use("/users", usersRouter);
app.use("/projects", projectRouter);

// Start the server
app.listen(config.express.port, config.express.host, () => {
  console.log(
    `Server running at http://${config.express.host}:${config.express.port}/`
  );
});