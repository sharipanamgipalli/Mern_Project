const mongoose = require("mongoose");
const itinerarySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  summary: {
    type: String,
  },
  duration: {
    type: String,
  },
  price: {
    type: String,
  },
  rating: {
    type: String,
  },
  favourites: {
    type: [String],
  },
  comments: {
    type: [Object],
  },
});

module.exports = mongoose.model("itinerary", itinerarySchema);
