const express = require("express");
const {userAuth} = require("../Middlewares/auth");
const profileRouter = express.Router();

// getting the user profile
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("ERROR :" + err.message);
  }
});

module.exports = { profileRouter };
