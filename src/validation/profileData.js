const { UPDATED_VALUES } = require("../utils/constant");

const isValidateEditAllowed = (req) => {
  const isEditAllowed = Object.keys(req.body).every((field) =>
    UPDATED_VALUES.includes(field),
  );
  return isEditAllowed;
};
module.exports = { isValidateEditAllowed };
