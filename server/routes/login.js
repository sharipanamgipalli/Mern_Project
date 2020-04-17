const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const saltRounds = 10;

const login = require("../model/loginModel");
const expressValidator = require("express-validator");
const { check, validationResult } = require("express-validator");
const key = require("../keys");
const jwt = require("jsonwebtoken");

const users = [];

router.get("/users/all", (req, res) => {
  res.json(users);
});
router.post(
  "/loggedInUser",
  [
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
      const loggedInUser = new login({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash,
      });
      loggedInUser
        .save()
        .then((loggedInUser) => {
          console.log(loggedInUser);
          res.send(loggedInUser);
        })
        .catch((err) => {
          res.status(500).send("Server error");
        });
      res.status(201).json({
        message: "Fetched user successfully",
        UserFound: loggedInUser,
      });
    });
  }
);

module.exports = router;
