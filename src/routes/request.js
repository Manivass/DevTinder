const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../Middlewares/auth");
const requestRouter = express.Router();
const User = require("../models/user");
const { Collection } = require("mongoose");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const isUserAvailable = await User.findById(toUserId);
      if (!isUserAvailable) {
        return res.status(404).send("user not found");
      }

      if (!["interested", "ignored"].includes(status)) {
        return res.status(400).send("status type is not valid");
      }

      const isConnectionAlreadySend = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (isConnectionAlreadySend) {
        return res.status(400).send("connection already sended");
      }
      if (fromUserId.equals(toUserId)) {
        throw new Error("you cannot send message to yourself");
      }

      const data = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      await data.save();
      res.json({ message: "connection send successfully", data });
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:reqId",
  userAuth,
  async (req, res) => {
    try {
      let loggedUser = req.user;
      let { status, reqId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.send(400).send(`${status} is not valid status`);
      }
      const connectionAvailable = await ConnectionRequest.findOne({
        _id: reqId,
        toUserId: loggedUser._id,
        status: "interested",
      });
      if (!connectionAvailable) {
        res.status(404).send("user not found");
      }
      connectionAvailable.status = status;
      await connectionAvailable.save();
      res.json({ meesage: `${status} successfully`, connectionAvailable });
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
);

module.exports = { requestRouter };
