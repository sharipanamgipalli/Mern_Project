const express = require("express");
const router = express.Router();

const itineraryModel = require("../model/itineraryModel");
router.get("/all", (req, res) => {
  itineraryModel
    .find()
    .then(files => {
      console.log("success");
      res.send(files);
    })
    .catch(err => console.log(error));
});
router.get("/:city", (req, res) => {
  let cityRequested = req.params.city;
  itineraryModel.find({ city: cityRequested }).then(itineraries => {
    console.log("itineraries found!");
    res.send(itineraries);
  });
  //   console.log(req.query);
  //   itineraryModel.find({ name: cityRequested }).then(itinerary => {
  //     res.send(itinerary);
  //   });
  //   res.send("/itineraries", cityRequested);
});
// router.post("/", (req, res) => {
//   const newItinerary = new itineraryModel({
//     city: req.body.city,
//     title: req.body.title,
//     img: req.body.img,
//     summary: req.body.summary,
//     duration: req.body.duration,
//     price: req.body.price,
//     rating: req.body.rating
//   });
// newItinerary
//   .save()
//   .then(itinerary => {
//     res.send(itinerary);
//   })
//   .catch(err => {
//     res.status(500).send("Server error");
//   });

module.exports = router;
