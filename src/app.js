const express = require("express");

const app = express();

// app.use("/hello", (req , res) => res.send("Hello for the server"));

// app.use("/hellob" , (req , res) => res.send("Dubokur Manda")) ;

app.use("/test", (req, res) => res.send("HAHAHAHAHAHAHAHA"));

app.post("/test", (req, res) => {
  res.end(" Successfully Posted ");
});

app.get("/test", (req, res) => {
  res.end(" Successfully tested ");
});

app.put("/test", (req, res) => {
  res.end("Successfully updated..");
});

app.delete("/test", (req, res) => {
  res.end("successfully deleted.");
});

// app.use("/", (req, res) => res.send(" Creating an Dev Tinder Project "));

app.listen(4000, () => {
  console.log("Server Successfully Connected to Server");
});
