const express = require("express");
const router = express.Router();
const User = require("../model/userModel");

const itineraryModel = require("../model/itineraryModel");
router.get("/all", (req, res) => {
  itineraryModel
    .find()
    .then((files) => {
      console.log("success");
      res.send(files);
    })
    .catch((err) => console.log(error));
});
router.get("/:city", (req, res) => {
  let cityRequested = req.params.city;
  itineraryModel.find({ city: cityRequested }).then((itineraries) => {
    res.send(itineraries);
  });
});
router.post("/:title", (req, res) => {
  console.log(req.body);
  let id = req.body.id;
  let email = req.body.email;
  let name = req.params.title;
  itineraryModel.findOne({ _id: id }).then((itinerary) => {
    itinerary.favourites.push(email);
    console.log("favourite itinerary", itinerary);
    itinerary.save().then((savedItinerary) => {
      User.findOne({ email: email }).then((user) => {
        user.favourites.push(name);
        console.log("user", user);
        user.save();
        res.status(201).json({
          itinerary: savedItinerary,
          favourites: user.favourites,
        });
      });
    });
  });
});

router.post("/delete/:title", (req, res) => {
  console.log(req.body);
  const name = req.params.title;
  const id = req.body.id;
  const email = req.body.email;
  console.log("email", email);
  itineraryModel.findOne({ _id: id }).then((itinerary) => {
    console.log("delete itinerary", itinerary);
    let index = itinerary.favourites.indexOf(email);
    itinerary.favourites.splice(index, 1);
    console.log(itinerary.favourites);
    itinerary.save().then((savedItinerary) => {
      User.findOne({ email: email }).then((user) => {
        console.log("user", user);

        let index = user.favourites.indexOf(name);
        user.favourites.splice(index, 1);

        console.log(user.favourites);
        user.save();
        res.status(201).json({
          itinerary: savedItinerary,
          favourites: user.favourites,
        });
      });
    });
  });
});

router.post("/post/:id/comments", (req, res) => {
  let id = req.params.id;
  let comment = {
    email: req.body.email,
    comment: req.body.comment,
  };
  itineraryModel.findById({ _id: id }).then((itinerary) => {
    itinerary.comments.push(comment);
    console.log("comments obj", itinerary.comment);
    itinerary.save().then((savedItinerary) => {
      User.findOne({ email: comment.email }).then((user) => {
        user.comments.push(id);
        console.log("user", user);
        user.save();
        res.status(201).json({
          itinerary: savedItinerary,
        });
      });
    });
  });
});

router.post("/delete/:id/comments", (req, res) => {
  let id = req.params.id;
  let comment = {
    email: req.body.email,
    comment: req.body.comment,
  };
  itineraryModel.findById({ _id: id }).then((itinerary) => {
    let index = itinerary.comments.indexOf(comment);
    itinerary.comments.splice(index, 1);
    console.log("deleted comment", itinerary);
    itinerary.save().then((savedItinerary) => {
      User.findOne({ email: comment.email }).then((user) => {
        let index = user.comments.indexOf(id);
        user.comments.splice(index, 1);
        console.log("deleted from user", user);
        user.save();
        res.status(201).json({
          itinerary: savedItinerary,
        });
      });
    });
  });
});
router.get("/get/:id/comments", (req, res) => {
  let id = req.params.id;
  itineraryModel.findById({ _id: id }).then((itinerary) => {
    console.log(itinerary.comments);
    res.status(201).json({
      itinerary: itinerary,
    });
  });
});

router.post("/update/:id/comments", (req, res) => {
  console.log(req.body);
  let id = req.params.id;

  itineraryModel.findOne({ _id: id }).then((itinerary) => {
    console.log("Comment updated", itinerary);
    let commentUser = itinerary.comments.filter((commObj) => {
      return (
        commObj.email == req.body.email && commObj.comment == req.body.comment
      );
    });
    console.log(itinerary.comments.indexOf(commentUser));
    commentUser = { ...commentUser, comment: req.body.newComment };

    console.log("new comment", commentUser);
    itinerary.save().then((savedItinerary) => {
      res.status(201).json({
        itinerary: savedItinerary,
      });
    });
  });
});

router.post("/", (req, res) => {
  const newItinerary = new itineraryModel({
    city: req.body.city,
    title: req.body.title,
    img: req.body.img,
    summary: req.body.summary,
    duration: req.body.duration,
    price: req.body.price,
    rating: req.body.rating,
  });
  newItinerary
    .save()
    .then((newItinerary) => {
      res.status(201).json({
        message: "Added new Itinerary",
        newItinerary: newItinerary,
      });
    })
    .catch((err) => {
      res.status(500).send("Server error");
    });
});

module.exports = router;
