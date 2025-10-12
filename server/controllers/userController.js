// controllers/user.controller.js
import User from "../models/User.js";

// Lấy danh sách tất cả user
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("Lỗi lấy danh sách user:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy 1 user theo ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
    res.json(user);
  } catch (error) {
    console.error("Lỗi lấy user:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Cập nhật user
export const updateUser = async (req, res) => {
  try {
    const { name, email, phone, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, avatar },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
    res.json({ message: "Cập nhật thành công", user });
  } catch (error) {
    console.error("Lỗi cập nhật user:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xoá user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
    res.json({ message: "Xoá user thành công" });
  } catch (error) {
    console.error("Lỗi xoá user:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
