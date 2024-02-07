const express = require("express");
require("dotenv").config();
const app = express();
var cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const user = require("./routes/user");
const marvel = require("./routes/marvel");

app.use("/api/v1", user);
app.use("/api/v1", marvel);

module.exports = app;
