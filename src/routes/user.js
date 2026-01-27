const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { USER_SAFE_DATA } = require("../utils/constant");
const User = require("../models/user");
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
    if (connections.length === 0) {
      return res.status(404).send("No connections found");
    }
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

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedUser._id }, { toUserId: loggedUser._id }],
    }).select("fromUserId toUserId");
    let hideUserFromFeed = new Set();
    connectionRequests.forEach((user) => {
      hideUserFromFeed.add(user.fromUserId.toString());
      hideUserFromFeed.add(user.toUserId.toString());
    });
    const usersValidForFeed = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ feed: usersValidForFeed });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

/*
Pagination

/user/feed?page=1&limit=10 -> 1 - 10 user -> .skip(0) .limit(10)

/user/feed?page=2&limit=10 -> 11 - 20 user -> .skip(10) .limit(10)

/user/feed?page=3&limit=10 -> 21 - 30 user -> skip(10)  .limit(10)
*/

module.exports = { userRouter };
