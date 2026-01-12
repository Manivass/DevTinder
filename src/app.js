const express = require("express");

const app = express();

app.use(/^\/ab?c$/, (req, res) => {
  res.send("b is optional ");
});

app.use(/^\/ab+c$/, (req, res) => {
  res.send("b can comes multiple times");
});

app.use(/^\/ab*cd$/, (req, res) => {
  res.send("anything come between ab and cd");
});

app.use(/.*fly$/, (req, res) => {
  res.end("a will come");
});

app.listen(4000, () => {
  console.log("Server Successfully Connected to Server");
});
