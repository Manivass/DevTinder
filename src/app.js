const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("Creating a Header 1 ");
    // res.end("1st Resopnse");
    next();
  },
  (req, res, next) => {
    console.log("Creating a Header 2");
    // res.end("2nd Response");
    next();
  },
  (req, res, next) => {
    console.log("Creating a Header 3");
    // res.end("3rd Response");
    next();
  },
  (req, res , next) => {
    console.log("Creating a Header 4");
    res.end("4th Response");
    //next() => it shown an error , last route handler must doesnt want next() 
  }
);

app.listen(4000, () => {
  console.log("Server Successfully Connected to Server");
});
