import mongoose from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";

// Lấy tất cả sản phẩm, filter theo category/brand
export const getProducts = async (req, res) => {
    const { category: categoryName, brand: brandId } = req.query;

    try {
    let filter = {};

    //  Lọc theo category name (frontend gửi tên category)
    if (categoryName) {
        const category = await Category.findOne({
        name: new RegExp(`^${categoryName}$`, "i"),
        });
        if (!category)
        return res.status(404).json({ message: "Category not found" });
        filter.category = category._id;
    }

    // Lọc theo brand _id nếu không phải "all"
    if (brandId && brandId !== "all") {
        if (!mongoose.Types.ObjectId.isValid(brandId)) {
        return res.status(400).json({ message: "Invalid brand ID" });
        }

        const brand = await Brand.findById(brandId);
        if (!brand) return res.status(404).json({ message: "Brand not found" });

        filter.brand = brand._id;
    }

    const products = await Product.find(filter)
        .populate("brand", "name")
        .populate("category", "name");

    res.json(products);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
};



// Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("brand", "name slug")
            .populate("category", "name slug");

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
