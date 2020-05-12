const express = require("express");
const router = express.Router();

const cityModel = require("../model/cityModel");
router.get("/all", (req, res) => {
  cityModel
    .find()
    .then((files) => {
      console.log("success");
      res.send(files);
    })
    .catch((err) => console.log(error));
});
router.post("/", (req, res) => {
  const newCity = new cityModel({
    name: req.body.name,
    country: req.body.country,
    img: req.body.img,
  });
  newCity
    .save()
    .then((newCity) => {
      res.status(201).json({
        message: "Added new City",
        newCity: newCity,
      });
    })
    .catch((err) => {
      res.status(500).send("Server error");
    });
});

module.exports = router;
