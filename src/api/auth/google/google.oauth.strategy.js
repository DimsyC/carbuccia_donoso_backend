const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("../../../config");
const Users = require("../../users/users.model");

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
            // If the user exists, log them in
            return done(null, user);
          }
          console.log("profile", profile);
          console.log("user", user);

          // Restrict user creation to only your email
          if (profile._json.email !== "dimsy_donoso@hotmail.com") {
            return done(null, false, {
              message: "User creation is restricted.",
            });
          }

          // If the user doesn't exist, create a new user in the database and log them in
          const newUser = {
            email: profile._json.email,
            password: "", // You can generate a random password or leave it blank
            providers: [profile.provider],
          };
          const userId = await Users.create(newUser);
          newUser._id = userId;

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Deserialize user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Users.getById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = configurePassport;
