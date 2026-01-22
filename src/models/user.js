const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 2,
      trim: true,
    },
    lastName: {
      type: String,
      maxLength: 50,
      minLength: 2,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is weak");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      lowerCase: true,
      trim: true,
      validate: function (value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid..");
        }
      },
    },
    about: {
      type: String,
      default: "This is default about of the user",
      maxLength: 250,
    },
    photoURL: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
      validate(value) {
        if (!validator.isURL(value)) throw new Error("URL is not found");
      },
    },
    skills: {
      type: [String],
      validate: function (value) {
        if (value && value.length > 10) {
          throw new Error(
            "only 10 skills are allowed . please give less than 10 skills",
          );
        }
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.comparePasswordAndHash = async function (
  getPasswordFromUser,
) {
  const user = this;
  const passwordHash = await bcrypt.compare(getPasswordFromUser, user.password);
  return passwordHash;
};
userSchema.methods.getJWT = async function () {
  let user = this;
  let token = await jwt.sign({ _id: user._id }, "DEV@TINDER$!@#");
  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
