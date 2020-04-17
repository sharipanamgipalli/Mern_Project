const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../model/userModel");
const expressValidator = require("express-validator");
const { check, validationResult } = require("express-validator");

router.post(
  "/newUser",
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
      });
      newUser
        .save()
        .then((newUser) => {
          console.log(newUser);
          res.send(newUser);
        })
        .catch((err) => {
          res.status(500).send("Server error");
        });
      res.status(201).json({
        message: "Added new user successfully",
        createdUser: newUser,
      });
    });
  }
);

router.post(
  "/user",
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({ errors: errors.array() });
    }
    const user = newUser.find((user) => (user.email = req.body.email));
    if (user == null) {
      return res.status(400).send("Cannot find user");
    }
    if (bcrypt.compare(req.body.password, user.password)) {
      res.send("Success passwords match!");
      const payload = {
        id: user._id,
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
      res.send("Not Allowed");
    }
  }
);

module.exports = router;
