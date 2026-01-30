const { Schema, default: mongoose } = require("mongoose");

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
  },
  { collection: "users" },
);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
