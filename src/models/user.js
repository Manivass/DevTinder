const mongoose = require("mongoose");

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
      maxLength : 250 ,
    },
    photoURL: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
    },
    skills: {
      type: [String],
      validate : function(value){
        if(value.length > 10){
          throw new Error("only 10 skills are allowed . please give less than 10 skills");
        }
      }
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
