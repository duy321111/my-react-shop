// controllers/brandController.js
import Brand from "../models/Brand.js";

//  Lấy toàn bộ brand
export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createBrand = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//  Xóa thương hiệu theo ID
export const deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa thương hiệu thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({ message: "Không tìm thấy thương hiệu" });
    }

    res.status(200).json(updatedBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};