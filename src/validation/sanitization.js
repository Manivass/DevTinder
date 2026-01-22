const validator = require("validator");

const sanitizationSignUp = (req) => {
  const { firstName, emailId, password } = req.body;

  if (!firstName) {
    throw new Error("Please enter your firstname!");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("firstname must be in 4 to 50 characters!");
  } else if (!emailId) {
    throw new Error("please enter your emailId!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("please enter valid emailId!");
  } else if (!password) {
    throw new Error("please enter password!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter strong password!");
  }
};

const sanitizeUpdateField = (req) => {
  const { skills, about, emailId, firstName, lastName, photoURL, gender, age } =
    req.body;
  if (firstName && firstName.length < 4) {
    throw new Error("firstname must be have greater than 4 characters");
  } else if (lastName && lastName.length < 4) {
    throw new Error("lastname must be have greater than 4 characters");
  } else if (age && age < 18) {
    throw new Error("age must be greater than 18 ");
  } else if (skills && skills.length > 10) {
    throw new Error("only 10 skills are allowed");
  } else if (photoURL && !validator.isURL(photoURL)) {
    throw new Error("photoURL is invalid");
  } else if (gender && !["male", "female", "others"].includes(gender)) {
    throw new Error("gender is invalid");
  } else if (about && about.length > 250) {
    throw new Error("about must have less than 250 characters");
  } else if (emailId && !validator.isEmail(emailId)) {
    throw new Error("emailId is invalid");
  }
};

module.exports = { sanitizationSignUp, sanitizeUpdateField };
