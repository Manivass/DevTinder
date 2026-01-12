const express = require("express");

const app = express();

app.use("/user", (req, res) => {
  console.log(req.query);
  res.end("Get the user Search params");
});

app.use("/texter/:name/:pass", (req, res) => {
  console.log(req.params);
  res.end("Get the user params");
});

app.listen(4000, () => {
  console.log("Server Successfully Connected to Server");
});
