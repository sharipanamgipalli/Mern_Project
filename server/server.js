const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
const db = require("./keys").mongoURI;
const mongoose = require("mongoose");
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log("mongoDB is connected...");
  })
  .catch(err => {
    console.log(err);
  });

app.use("/cities", require("./routes/cities"));
app.use("/itineraries", require("./routes/itineraries"));

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
