const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const razorpayinstance = require("../utils/razorpay");
const paymentRouter = express.Router();
const { Payment } = require("../models/payment");
const { membershipAmount } = require("../utils/constant");
const User = require("../models/user");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const { membershipType } = req.body;
    const order = await razorpayinstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: loggedUser.firstName,
        lastName: loggedUser.lastName,
        emailId: loggedUser.emailId,
        membership: membershipType,
      },
    });

    const newPayment = new Payment({
      userId: loggedUser._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
      status: order.status,
    });

    await newPayment.save();

    res.status(200).json({ newPayment, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(404).send(err.message);
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const {
      validateWebhookSignature,
    } = require("razorpay/dist/utils/razorpay-utils");

    const webhookSignature = req.get("X-Razorpay-Signature");

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.WEBHOOK_SECRET_KEY,
    );

    if (!isWebhookValid) {
      return res
        .status(400)
        .json({ success: false, message: " your webhook is invalid " });
    }

    const paymentDetails = req.body.payload.payment.entity;
    console.log(paymentDetails);
    

    const isPaymentAvailable = await Payment.findOne({
      orderId: paymentDetails.order_id,
    });

    isPaymentAvailable.status = paymentDetails.status;

    await isPaymentAvailable.save();

    const user = await User.findOne({ emailId: paymentDetails.notes.emailId });
    user.isPremiuemUser = true;
    user.membershipType = paymentDetails.notes.membership;

    await user.save();

    res.status(201).json({
      success: false,
      message: `your order ${paymentDetails.status} successfully`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = { paymentRouter };
