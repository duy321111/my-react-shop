import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra user đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email đã tồn tại" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error("Lỗi register:", err);
    res.status(500).json({ message: "Server lỗi" });
  }
};

export const login = async (req, res) => {
  try {
    const { name, email, password} = req.body;
    
    //Tim user

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:"Sai tài khoản hoặc mật khẩu"})

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({message:"Sai tài khoản hoặc mật khẩu"})

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Đăng nhập thành công", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi server" });
    }
}

export const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) return res.status(401).json({ message: "Không có token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); 
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};