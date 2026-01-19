const mongoose = require("mongoose");
const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { connectionDB } = require("./config/database.js");
const User = require("./models/user.js");
const { UPDATED_VALUES } = require("./utils/constant.js");
const { validationSignUp } = require("./utils/validation.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./Middlewares/auth.js");
const app = express();

app.use(express.json());
app.use(cookieParser());
// posting user to db
app.post("/signUp", async (req, res) => {
  try {
    // validating the req
    validationSignUp(req);
    const { firstName, lastName, emailId, password } = req.body;

    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating a new instances of User
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User successfully added");
  } catch (err) {
    res.status(400).send(err.message);
  }

  // const user = new User(userObj);
  // await user.save();
  // res.send("User succesfully added");
});

// login user
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      throw new Error("please enter the required field");
    } else if (!validator.isEmail(emailId)) {
      throw new Error("please enter valid emailId");
    }
    const findingEmail = await User.findOne({ emailId: emailId });
    if (!findingEmail) {
      throw new Error("Invalid creditenials");
    }

    const checkPassword = await bcrypt.compare(password, findingEmail.password);
    if (!checkPassword) {
      throw new Error("Invalid creditenials");
    }
    const { _id } = findingEmail;

    // creating token

    const token = jwt.sign({ _id: _id }, "DEV@TINDER$!@#"); //DEV@TINDER$!@# -> secret key

    res.cookie("token", token);
    res.send("successfully logged in 💐");
  } catch (err) {
    res.status(401).send("ERROR :" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("ERROR :" + err.message);
  }
});

app.post("/sendingConnection", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " sending the connection request");
  } catch (err) {}
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
