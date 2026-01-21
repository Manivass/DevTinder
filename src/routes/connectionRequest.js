const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const connectionRequestRouter = express.Router();

//sending the connection request
connectionRequestRouter.post("/sendingConnection", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " sending the connection request");
  } catch (err) {
    res.status(404).send("ERROR :" + err.message);
  }
});

module.exports = { connectionRequestRouter };
