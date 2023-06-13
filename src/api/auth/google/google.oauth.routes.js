const express = require("express");
const passport = require("passport");
const configureGoogleOAuth = require("./google.oauth.strategy");

const googleOAuthRouter = express.Router();

// Setup Google authentication strategy
configureGoogleOAuth(passport);

// Registration and Login with Google
googleOAuthRouter.get(
  "/google",
  passport.authenticate("google", { session: false })
);

// Google authentication callback
googleOAuthRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    // Return the token as a JSON response
    res.json({ user });
  }
);

module.exports = googleOAuthRouter;
