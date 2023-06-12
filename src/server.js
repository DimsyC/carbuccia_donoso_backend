const express = require("express");
const session = require("express-session");
const passport = require("passport");
const googleOAuthRouter = require("./api/auth/google/google.oauth.routes");
const usersRouter = require("./api/users/users.routes");
const projectRouter = require("./api/projects/projects.routes");
const fileRouter = require("./api/files/files.routes");
const config = require("./config");

const isAuthenticated = require('./middleware/is.authenticated')

const app = express();

// Middleware
app.use(express.json());

// Configure session middleware
app.use(
  session({
    secret: config.express.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/fail", (req, res) => {
  throw new Error("Oops! Something went wrong.");
});

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Add authentication routes
app.use("/auth", googleOAuthRouter);
app.use("/files", fileRouter);

//Midleware to ensure authentication for all routes below this point
app.use(isAuthenticated)

// Routes
app.use("/users", usersRouter);
app.use("/projects", projectRouter);

// Start the server
app.listen(config.express.port, config.express.host, () => {
  console.log(
    `Server running at http://${config.express.host}:${config.express.port}/`
  );
});
