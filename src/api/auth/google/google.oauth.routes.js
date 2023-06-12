const express = require("express");
const passport = require("passport");
const configureGoogleOAuth = require("./google.oauth.strategy");

const googleOAuthRouter = express.Router();

// Setup Google authentication strategy
configureGoogleOAuth(passport);

// Registration and Login with Google
googleOAuthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google authentication callback
googleOAuthRouter.get(
  "/google/callback",
  passport.authenticate("google", { successRedirect: "/", failureRedirect: "/login" }),
);

module.exports = googleOAuthRouter;
