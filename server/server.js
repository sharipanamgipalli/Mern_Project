const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

const mongoURI = require("./keys").mongoURI;

// app.get("/", function(req, res) {
//   res.send("Hello World");
// });

// app.listen(3000);
const mongoose = require("mongoose");
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoDB is connected...");
  })
  .catch(err => {
    throw err;
  });
// var db = mongoose.connection;
// mongoose.connection
//   .once("open", function() {
//     console.log("Connection established....");
//   })
//   .on("error", function(error) {
//     console.log("Error in connection" + error);
//   });
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   console.log("Connection established...");
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
