const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 3,
      trim: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim:true,
      
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address");
        }
      },
    },

    password: {
      type: String,
      required: true,
      trim:true,

      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol");
        }
      },
    },
  },
  { collection: "users" },
);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
