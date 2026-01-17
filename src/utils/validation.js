const validator = require("validator");

const validationSignUp = (req) => {
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

module.exports = { validationSignUp };
