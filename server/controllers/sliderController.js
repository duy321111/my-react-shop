import Slider from "../models/Slider.js";

// Lấy tất cả slider
export const getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ createdAt: -1 });
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy slider", error });
  }
};

// Thêm slider

export const createSlider = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const newSlider = new Slider({
      image: imagePath,
      description: req.body.description,
      status: req.body.status ?? true,
    });
    await newSlider.save();
    res.status(201).json(newSlider);
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo slider", error });
  }
};


// Cập nhật slider
export const updateSlider = async (req, res) => {
  try {
    const slider = await Slider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(slider);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật slider", error });
  }
};

// Xóa slider
export const deleteSlider = async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa slider thành công" });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi xóa slider", error });
  }
};
