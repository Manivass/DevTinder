const express = require("express");
const { connectionDB } = require("./config/database.js");
const User = require("./models/user.js");
const app = express();

app.use(express.json());

// posting user to db
app.post("/signUp", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User successfully added");
  } catch (err) {
    res.status(400).send(err.message);
  }

  // const user = new User(userObj);
  // await user.save();
  // res.send("User succesfully added");
});

// finding user from db
app.get("/user", async (req, res) => {
  let userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("Not found");
    } else {
      res.send(users);
    }
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
  let userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("user successfully deleted");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//updating user using id and emailId
app.patch("/user", async (req, res) => {
  let userId = req.body.userId;
  let emailId = req.body.emailId;
  let data = req.body;
  try {
    await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (err) {
    res.status(500).send("something went wrong");
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
