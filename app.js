const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

if (process.env.Env === "Test") {
  mongoose.connect("mongodb://localhost/bookAPI_Test");
} else {
  mongoose.connect("mongodb://localhost/bookAPI");
}

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);
app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Hi, I'm working");
});

app.server = app.listen(port, () => {
  console.log("started", port);
});

module.exports = app;
