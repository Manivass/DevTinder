const express = require("express");
const { connectionDB } = require("./config/database.js");

const app = express();

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
