import express from "express";
import multer from "multer";
import path from "path";
import User from "../models/User.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// API upload avatar
router.post("/:userId", upload.single("avatar"), async (req, res) => {
  try {
    const imagePath = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { avatar: imagePath },
      { new: true }
    ).select("-password");

    res.json({ url: imagePath, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
