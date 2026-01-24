const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["accepeted", "rejected", "ignored", "interested"],
        message: `{VALUE} is not valid status`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
connectionRequestSchema.pre("save", function (req, res, next) {
  const { fromUserId, toUserId } = this;
  if (fromUserId.equals(toUserId)) {
    throw new Error("you cannot send message to yourself");
  }
  next();
});


const ConnectionRequest = new mongoose.model(
  "connectionRequest",
  connectionRequestSchema,
);

module.exports = ConnectionRequest;
