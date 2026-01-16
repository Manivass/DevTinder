const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 2,
      trimm: true,
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
      lowerCase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLentgth: 8,
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
    },
    photoURL: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
