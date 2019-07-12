const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Get says hello world");
});

app.listen(port, () => {
  console.log("started", port);
});
