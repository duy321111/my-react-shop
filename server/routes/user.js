// routes/user.route.js
import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Xem tất cả user
router.get("/", getAllUsers);

// Xem user theo ID
router.get("/:id", getUserById);

// Cập nhật user
router.put("/update/:id", updateUser);

// Xóa user
router.delete("/:id", deleteUser);

export default router;
