import Category from "../models/Category.js";
import Brand from "../models/Brand.js";

// Lấy danh sách brands theo category
export const getBrandsByCategory = async (req, res) => {
  try {
    const { categoryNameOrId } = req.params;

    const category = await Category.findOne({
    name: new RegExp(`^${categoryNameOrId}$`, "i") 
    }).populate("brands");
    ;

    if (!category) return res.status(404).json({ message: "Category not found" });

    res.json(category.brands); // trả về mảng brands
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Lấy tất cả category (populate brands)
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("brands");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo category
export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
