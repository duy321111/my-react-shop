// controllers/adminController.js
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body; // Đổi tên đúng với schema

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Email không tồn tại!" });
    }

    // So sánh password nhập với password hash trong DB
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Sai mật khẩu!" });
    }

    // Tạo token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      "secret-key", // TODO: thay bằng biến môi trường trong thực tế
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    return res.status(500).json({ message: "Lỗi máy chủ!" });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const list = await Admin.find().select("-password"); // không trả password
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/admin
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Thiếu trường bắt buộc" });

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email đã tồn tại" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ name, email, password: hash, role });
    await newAdmin.save();
    res.status(201).json({ message: "Tạo thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/admin/update/:id
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const admin = await Admin.findById(id);
    if (!admin) return res.status(404).json({ message: "Không tìm thấy admin" });

    // nếu đổi email, kiểm tra trùng
    if (email && email !== admin.email) {
      const exists = await Admin.findOne({ email });
      if (exists) return res.status(400).json({ message: "Email đã được sử dụng" });
      admin.email = email;
    }

    admin.name = name ?? admin.name;
    admin.role = role ?? admin.role;

    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    } // nếu password rỗng -> giữ nguyên

    await admin.save();
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/admin/:id
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Admin.findByIdAndDelete(id);
    res.json({ message: "Xoá thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};