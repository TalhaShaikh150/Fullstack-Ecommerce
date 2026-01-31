const validator = require("validator");

function validateSignUp(req) {
  const { name, email, password } = req.body;

  if (!name) {
    throw new Error("Name is Required!");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email Address");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol",
    );
  }
}

function validateLogin(req) {
  const {email,password} = req.body
  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email Address");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol",
    );
  }
}

module.exports = {
  validateSignUp,
  validateLogin,
};
