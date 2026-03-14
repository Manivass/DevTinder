const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    paymentId: {
      type: String,
    },
    orderId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
    },
    notes: {
      type: Object,
    },
    status: {
      type: String,
      required: true,
      default: "created",
    },
  },
  {
    timestamps: true,
  },
);

const Payment = new mongoose.model("Payment", paymentSchema);

module.exports = { Payment };
