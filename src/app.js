const express = require("express");
const { authAdmin, userAuth } = require("./Middlewares/auth.js");

const app = express();

app.use("/admin", authAdmin);

app.use("/user/login", (req, res) => {
  res.send("User successfully logged in");
});

app.use("/user", userAuth, (req, res) => {
  res.send("User active");
});

app.get("/admin/getData", (req, res) => {
  res.send("gets the users data");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("delete the users data");
});

app.listen(4000, () => {
  console.log("Server Successfully Connected to Server");
});
