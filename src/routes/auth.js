const { sanitizationSignUp } = require("../validation/sanitization.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const express = require("express");
const validator = require("validator");
const { userAuth } = require("../Middlewares/auth.js");
const authRouter = express.Router();

// posting user to db
authRouter.post("/signUp", async (req, res) => {
  try {
    // validating the req
    sanitizationSignUp(req);
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

    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, { expires: new Date(Date.now() + 12 * 60 * 60 * 60) });
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err.message);
  }

  // const user = new User(userObj);
  // await user.save();
  // res.send("User succesfully added");
});

// login user
authRouter.post("/login", async (req, res) => {
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
    const checkPassword = await findingEmail.comparePasswordAndHash(password);

    if (!checkPassword) {
      throw new Error("Invalid creditenials");
    }
    // creating token and using schema methods

    const token = await findingEmail.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 1 * 60 * 60 * 60),
    });
    res.send(findingEmail);
  } catch (err) {
    res.status(401).send("ERROR :" + err.message);
  }
});

authRouter.post("/logout", userAuth, async (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send("logout successfully");
});

module.exports = { authRouter };
