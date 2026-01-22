const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const profileRouter = express.Router();
const { isValidateEditAllowed } = require("../validation/profileData");
const { sanitizeUpdateField } = require("../validation/sanitization");

// getting the user profile

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("ERROR :" + err.message);
  }
});

//editing the profile

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!isValidateEditAllowed(req)) {
      throw new Error("your fields are invalid");
    }
    sanitizeUpdateField(req);
    const loggedUser = req.user;
    console.log(loggedUser);
    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));
    await loggedUser.save();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = { profileRouter };
