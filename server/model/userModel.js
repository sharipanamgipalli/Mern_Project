const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const saltRounds = 10;
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  OAuth: {
    type: Boolean,
    required: true,
  },
  favourites: {
    type: [String],
  },
  comments: {
    type: [Object],
  },
});

module.exports = mongoose.model("User", userSchema);
