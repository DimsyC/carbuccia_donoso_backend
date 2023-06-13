const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Users = require("../../users/users.model");
const config = require("../../../config");
const jwt = require('../../../utils/jwt')

const configurePassport = (passport) => {
  // Setup Google authentication strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleOAuth.clientID,
        clientSecret: config.googleOAuth.clientSecret,
        callbackURL: "http://127.0.0.1:3000/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if the user exists in the database
          const user = await Users.getByEmail(profile._json.email);
          if (user) {
             // If the user exists, generate a JWT token and return it
             const token = jwt.generateToken(user)
             user.token = token

            return done(null, user);
          }

          // Restrict user creation to only your email
          if (profile._json.email !== "dimsy_donoso@hotmail.com") {
            return done(null, false, {
              message: "User creation is restricted.",
            });
          }

          // If the user doesn't exist, create a new user in the database and log them in
          const newUserData = {
            email: profile._json.email,
            password: "", // You can generate a random password or leave it blank
            providers: [profile.provider],
          };
          const newUser = await Users.create(newUserData);

          return done(null, newUser);
        } catch (error) {
          return done(error);   
        }
      }
    )
  );
};

module.exports = configurePassport;
