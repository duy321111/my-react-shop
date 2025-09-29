import express from "express";
import Product from "../models/Product.js";
import Brand from "../models/Brand.js"
import Category from "../models/Category.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("brand", "name")       // lấy tên brand
      .populate("category", "name");   // lấy tên category
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("brand", "name")
      .populate("category", "name");

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
