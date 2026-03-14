const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const razorpayinstance = require("../utils/razorpay");
const paymentRouter = express.Router();
const { Payment } = require("../models/payment");
const { membershipAmount } = require("../utils/constant");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const { membershipType } = req.body;
    const order = await razorpayinstance.orders.create({
      amount: membershipAmount[membershipType],
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

    res.status(200).json({ newPayment });
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = { paymentRouter };
