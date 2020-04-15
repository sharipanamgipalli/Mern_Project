const express = require("express");
const router = express.Router();

const userModel = require("../model/userModel");

router.post("/register", function (req, res) {
  const newUser = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    picture: req.body.picture,
  });
  //Hashing the password
  newUser
    .save()
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      res.status(500).send("Server error");
    });
});

module.exports = router;
