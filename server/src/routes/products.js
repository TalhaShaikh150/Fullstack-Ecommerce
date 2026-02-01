const express = require("express");
const router = express.Router();
const { Products } = require("../model/productSchema");
const validator = require("validator");
const { AuthMiddleWare } = require("../middleware/auth.js");
const { validateProducts } = require("../lib/utils.js");



router.get('/',async (req,res)=>{
  try {
    
    const allProducts = await Products.find({})

    res.status(200).send({message:"Successfully Fetched All Products",allProducts})
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error: error.message });
  }
})


//Getting Single Product By Id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findById(id);

    if (!product) {
      res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: `Error fetching product ${id}`, error: error.message });
  }
});

//Adding Product
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

//Updating Product By Id
router.patch("/:id", AuthMiddleWare, async (req, res) => {
  try {
    const { id } = req.params;
    
    const { title, price, description, category, image } = req.body;

    const product = await Products.findById(id)

    if (!product) {
      res.status(404).send({ message: "Product not found" });
    }

    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price; 
    if (category) product.category = category;
    if (image) product.image = image;

    await product.save();

    res.status(200).send({ message: "Product Updated", product });
  } catch (error) {
    res.status(400).send({ message: "Error updating product", error: error.message });
  }
});

//Updating Product By Id
router.delete("/:id", AuthMiddleWare, async (req, res) => {
  try {
    const { id } = req.params;
  
    const product = await Products.findByIdAndDelete(id)

    if (!product) {
      res.status(404).send({ message: "Product not found" });
    }


    res.status(200).send({ message: "Product Deleted", product });
  } catch (error) {
    res.status(400).send({ message: "Error deleting product", error: error.message });
  }
});



module.exports = router;
