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

function validateProducts(req){
   const { title, price, description, category, image } = req.body;
  
      if (!title) {
        throw new Error("Product Title Is Required");
      }
      if (!price) {
        throw new Error("Product Price Is Required");
      }
  
      if (!description) {
        throw new Error("Product Description Is Required");
      }
  
      if (!category) {
        throw new Error("Product Category Is Required");
      }
      if (!validator.isURL(image)) {
        throw new Error("Image Should Be In URL Format");
      }
    
}

module.exports = {
  validateSignUp,
  validateLogin,
  validateProducts
};
