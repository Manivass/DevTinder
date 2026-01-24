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

module.exports = { requestRouter };
