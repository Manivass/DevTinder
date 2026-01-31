const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("token is invalid!!!!");
    // valiate the token
    const decoded = jwt.verify(token, "DEV@TINDER$!@#");
    const { _id } = decoded;
    const userAvailable = await User.findById(_id);
    if (!userAvailable) return res.status(401).send("unAuthorized access");
    req.user = userAvailable;
    next();
  } catch (err) {
    res.status(401).send("ERROR :" + err.message);
  }
};

module.exports = { userAuth };
