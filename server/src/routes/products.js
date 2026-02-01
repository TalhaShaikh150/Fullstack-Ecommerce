const express = require("express");
const router = express.Router();
const { Products } = require("../model/productSchema");
const validator = require("validator");
const { AuthMiddleWare } = require("../middleware/auth.js");
const { validateProducts } = require("../lib/utils.js");

router.post("/addproduct", AuthMiddleWare, async (req, res) => {
  try {
    validateProducts(req);
    const { title, price, description, category, image } = req.body;
    const newProduct = await Products({
      title,
      price,
      description,
      category,
      image,
    });

    await newProduct.save();
    res
      .status(201)
      .send({ message: "Created New Product Successfully!", newProduct });
  } catch (error) {
    res.status(400).send({ message: "Bad Request", error: error.message });
  }
});

module.exports = router;
