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

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};