const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const profileRouter = express.Router();
const { isValidateEditAllowed } = require("../validation/profileData");
const { sanitizeUpdateField } = require("../validation/sanitization");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");

// getting the user profile

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(401).send("ERROR :" + err.message);
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
    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));
    await loggedUser.save();
    res.json({
      message: `${loggedUser.firstName} your fields has been updated successfully `,
      data: loggedUser,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// changing the password

profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const { newPassword, oldPassword } = req.body;
    if (!newPassword || !oldPassword) {
      throw new Error("Both old and new Passwords are required");
    }
    if (newPassword === oldPassword) {
      throw new Error("Both new Password and old password must be different");
    }
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      loggedUser.password,
    );
    if (!isPasswordCorrect) {
      throw new Error("please enter a correct password");
    }
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("new Password is not strong");
    }
    const newPasswordToHash = await bcrypt.hash(newPassword, 10);
    loggedUser.password = newPasswordToHash;
    await loggedUser.save();
    res.send(
      `${loggedUser.firstName} your password has been successfully changed`,
    );
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = { profileRouter };
