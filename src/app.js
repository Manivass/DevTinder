const mongoose = require("mongoose");
const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { connectionDB } = require("./config/database.js");
const User = require("./models/user.js");
const { UPDATED_VALUES } = require("./utils/constant.js");
const { validationSignUp } = require("./utils/validation.js");

const app = express();

app.use(express.json());

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
    res.send("successfully logged in 💐");
  } catch (err) {
    res.status(401).send("ERROR :" + err.message);
  }
});

// finding user from db
app.get("/user", async (req, res) => {
  try {
    let userEmail = req.body.emailId;
    if (!validator.isEmail(userEmail)) throw new Error("email is not found");
    const users = await User.findOne({ emailId: userEmail });
    if (!users) {
      res.status(404).send("User Not Found");
    }
    res.send(users);
  } catch (err) {
    res.status(500).send("something went wrong in user");
  }
});

//getting all users from db
app.get("/feed", async (req, res) => {
  try {
    const userFeed = await User.find({});
    userFeed.length === 0
      ? res.status(404).send("user Not Found..")
      : res.send(userFeed);
  } catch (err) {
    res.status(500).send("Something went wrong in feed");
  }
});

// removing user from db using id
app.delete("/user", async (req, res) => {
  try {
    let userId = req.body.userId;
    const isUseravailabe = await User.findById(userId);
    if (!isUseravailabe) throw new Error("user is not available");
    await User.findByIdAndDelete(userId);
    res.send("user successfully deleted");
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
});

//updating user using id and emailId
app.patch("/user/:userId", async (req, res) => {
  let userId = req.params.userId;
  let data = req.body;
  let dataKeys = Object.keys(data);
  try {
    let userAvailable = await User.findOne({ _id: userId });
    if (!userAvailable) {
      res.status(404).send("User not found");
    }

    let validUpdatedValues = dataKeys?.every((k) => UPDATED_VALUES.includes(k));
    if (!validUpdatedValues) {
      return res.status(400).send("Update failed. Invalid fields");
    }
    await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
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
