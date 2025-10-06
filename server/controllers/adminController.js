// controllers/adminController.js
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const loginAdmin = async (req, res) => {
  const { adminUser, adminPass } = req.body;

  try {
    const admin = await Admin.findOne({ adminUser });
    if (!admin) {
      return res.status(400).json({ message: "Sai tên đăng nhập!" });
    }

    if (admin.adminPass !== adminPass) {
      return res.status(400).json({ message: "Sai mật khẩu!" });
    }

    const token = jwt.sign(
      { id: admin._id, adminUser: admin.adminUser },
      "secret-key", //  thay bằng biến môi trường trong thực tế
      { expiresIn: "1d" }
    );

    return res.status(200).json({ message: "success", token });
  } catch (err) {
    console.error(" Lỗi đăng nhập:", err);
    return res.status(500).json({ message: "Lỗi máy chủ!" });
  }
};
