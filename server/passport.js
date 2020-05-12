const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("./model/userModel");
const passport = require("passport");
const key = require("./keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const express = require("express");
const router = express.Router();

module.exports = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => console.log(err));
  })
);
//pass the user id info inside a cookie to browser
passport.serializeUser((user, done) => {
  //grab the id from the database not from profile or googleId
  done(null, user.id);
});

// recieve the cookie from browser and retrieve user id
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: key.clientID,
      clientSecret: key.clientKey,
      callbackURL: "/user/auth/google/redirect",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("profile", profile);
      User.findOne({ email: profile.emails[0].value }).then((currentUser) => {
        if (currentUser) {
          console.log(" Google User already exists", currentUser);
          //pass the user info through done method to serialize user
          done(null, currentUser);
        } else {
          const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            userName: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
            OAuth: true,
          });
          console.log(newUser);
          newUser.save().then((newUserGoogle) => {
            console.log("newUserGoogle created", newUserGoogle);
            //pass the user info through done method to serialize user
            done(null, newUserGoogle);
          });
        }
      });
    }
  )
);
