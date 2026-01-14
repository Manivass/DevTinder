const express = require("express");
const { connectionDB } = require("./config/database.js");
const User = require("./models/user.js");
const app = express();

app.post("/signUp", async (req, res) => {
  const userObj = {
    firstName: "Thiru",
    lastName: "Kumaran",
    emailId: "vada@gopal.com",
    age: 19,
    gender: "male",
  };

  const user = new User(userObj);
  await user.save();
  res.send("User succesfully added");
});

connectionDB()
  .then(() => {
    console.log("DB is successfully connected to cluster");
    app.listen(4000, () => {
      console.log("Server Successfully Connected to Server");
    });
  })
  .catch(() => {
    console.log("DB didn't connect");
  });
