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




export const addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      origin,
      description,
      priceOld,
      priceCurrent,
      saleOff,
      quantityAvailable,
      promotions,
      specifications,
    } = req.body;

    // Validate required fields
    if (!name || !brand || !category || !priceOld || !priceCurrent || !req.files["image"]) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Parse promotions và specifications
    const promoArray = promotions ? JSON.parse(promotions) : [];
    const specArray = specifications ? JSON.parse(specifications) : [];

    // Lấy tên ảnh chính và ảnh phụ (chỉ lưu filename, không lưu đường dẫn đầy đủ)
    const mainImage = req.files["image"][0].filename; // Chỉ lấy tên file
    const extraImages = req.files["images"] ? req.files["images"].map((file) => file.filename) : []; // Chỉ lấy danh sách tên file

    // Tạo sản phẩm mới
    const newProduct = new Product({
      name,
      brand,
      category,
      origin: origin || "",
      description: description || "",
      priceOld: parseFloat(priceOld),
      priceCurrent: parseFloat(priceCurrent),
      saleOff: parseFloat(saleOff) || 0,
      quantityAvailable: parseInt(quantityAvailable) || 0,
      promotions: promoArray,
      image: mainImage, 
      images: extraImages,
      specifications: specArray,
    });

    // Lưu vào database
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};


// Xoá sản phẩm theo ID, kèm xoá ảnh
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Xoá sản phẩm khỏi database
    await Product.findByIdAndDelete(id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};
