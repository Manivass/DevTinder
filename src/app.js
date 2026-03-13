const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { connectionDB } = require("./config/database.js");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth.js");
const { profileRouter } = require("./routes/profile.js");
const { requestRouter } = require("./routes/request.js");
const { userRouter } = require("./routes/user.js");
require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
require("./utils/cronjob.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectionDB()
  .then(() => {
    console.log("DB is successfully connected to cluster");
    app.listen(4000, "0.0.0.0", () => {
      console.log("Server Successfully Connected to Server");
    });
  })
  .catch(() => {
    console.log("DB didn't connect");
  });
