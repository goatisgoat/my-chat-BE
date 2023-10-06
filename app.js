const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRputer = require("./routes/index");
require("dotenv").config();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRputer);

const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("connected");
});
