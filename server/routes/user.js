const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../model/userModel");
const expressValidator = require("express-validator");
const { check, validationResult } = require("express-validator");
const key = require("../keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post(
  "/register",
  [
    check("userName", "Username field cannot be empty.").notEmpty(),
    check(
      "userName",
      "Username must be between 4-15 characters long."
    ).isLength(4, 15),
    check(
      "email",
      "The email you entered is invalid, please try again."
    ).isEmail(),
    check(
      "email",
      "Email address must be between 4-100 characters long. Please try again"
    ).isEmail(),
    check(
      "password",
      "Password must be in between 8-100 characters long."
    ).isLength(8, 100),
    check(
      "password",
      "Password must include one lowercase character,one uppercase character, a number and a special character."
    ).matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/,
      "i"
    ),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({ errors: errors.array() });
    }
    bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        email: req.body.email,
        password: hash,
        picture: req.body.picture,
        OAuth: false,
      });
      console.log(newUser);
      newUser
        .save()
        .then((newUser) => {
          console.log(newUser);
          res.send(newUser);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Server error");
        });
    });
  }
);

router.post("/login", (req, res) => {
  const errors = validationResult(req);
  console.log("Login route", req.body);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).json({ errors: errors.array() });
  }
  //We obtain the details of the user through user model(User variable from model) and use findOne method to chech for a specific field
  User.findOne({ email: req.body.email }).then((user) => {
    console.log(user);
    if (user == null) {
      return res.status(400).send("Cannot find user");
    } else if (user.OAuth) {
      res.send("Please login with Google ");
    } else {
      bcrypt.compare(req.body.password, user.password).then((same, error) => {
        console.log(error);
        console.log(same);
        if (same) {
          const payload = {
            id: user.id,
            email: user.email,
            picture: user.picture,
          };
          const options = { expiresIn: 2592000 };
          jwt.sign(payload, key.secretOrKey, options, (err, token) => {
            if (err) {
              res.json({
                success: false,
                token: "There was an error",
              });
            } else {
              res.json({
                success: true,
                token: token,
              });
            }
          });
        } else {
          res.send("Incorrect password entered!");
        }
      });
    }
  });
});

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    //decode the token from header here and fetch id -another option
    User.findOne({ _id: req.body.id })
      .then((user) => {
        console.log("user", user);
        res.json(user);
        res.redirect("/cities");
      })
      .catch((err) =>
        res.status(404).json({ error: "User does not exist! Please Register" })
      );
  }
);

router.get("/logout", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    console.log("user", user);
    if (user == null) {
      return res.status(401).send("User not found cannot be deleted");
    } else {
      res.status(201).json({
        message: "Logged out successfully",
      });
    }
  });
  res.redirect("/login");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  //this url allows google to send code value in it and exchanged with access token along with profile info
  "/auth/google/redirect", // this url sends the contrl to serialize, stuff id in cookie, creates session..finally control comes to this (rreq,res)
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    console.log(req.user);
    const user = req.user;
    const payload = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      picture: user.picture,
    };
    const options = { expiresIn: 2592000 };
    jwt.sign(payload, key.secretOrKey, options, (err, token) => {
      console.log("Google jwt token", token);
      if (err) {
        res.json({
          success: false,
          token: "There was an error",
        });
      } else {
        res.redirect("http://localhost:3000/cities" + "?token=" + token);
      }
    });
  }
);

module.exports = router;
