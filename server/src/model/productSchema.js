const { Schema, default: mongoose } = require("mongoose");
const validator = require('validator')
const productSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 5,
      maxLength: 20,
      required: true,
      lowercase: true,
      trim: true,
    },

    price: {
      type: Number,
      min: 0,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500,
      minLength: 10,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
      minLength: 3,
    },

    image: {
      type:String,
      required:true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Image Should Be In URL Format");
        }
      },
    },
  },
  { collection: "products", timestamps: true },
);

const Products = mongoose.model("Products", productSchema);

module.exports = {
  Products,
};
