const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  try {
    throw new Error("error");
    res.send("Vanakam da mapla");
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});
app.use("/", (err, req, res, next) => {
  res.status(500).send("something went wrong");
});

app.listen(4000, () => {
  console.log("Server Successfully Connected to Server");
});
