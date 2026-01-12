const express = require("express");

const app = express();

app.use("/test", (req, res) => res.send(" Testing the DevTinder Project"));

app.use("/hello", (req , res) => res.send("Hello for the serverf"));

app.use("/", (req, res) => res.send(" Creating an Dev Tinder Project "));

app.listen(4000, () => {
  console.log("Server Successfully Connected to Server");
});
