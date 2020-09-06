const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

// Google OAuth2 with Passport
// The strategy is based on session cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      // First parameter is an error object
      // Second parameter is our actual data
      done(null, user);
    })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })

      if (existingUser) {
        // We have a record with a profile id
        done(null, existingUser);
      }

      // We don't have a user record with profile id
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
