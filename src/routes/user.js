const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { USER_SAFE_DATA } = require("../utils/constant");
const userRouter = express.Router();

// get all the pending connection request from logged user ;
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    let loggedUser = req.user;
    const ConnectionRequests = await ConnectionRequest.find({
      toUserId: loggedUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    if (!ConnectionRequests) {
      res.status(404).send("no connections found");
    }
    res.json({ connections: ConnectionRequests });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// get all the connections

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedUser._id }, { toUserId: loggedUser._id }],
      status: "accepted",
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connections.map((connector) => {
      if (connector.fromUserId.equals(loggedUser._id)) {
        return connector.toUserId;
      } else {
        return connector.fromUserId;
      }
    });
    res.json({ connector: data });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = { userRouter };
