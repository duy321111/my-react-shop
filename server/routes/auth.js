import express from "express";
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js"
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getMe);
router.put("/update", verifyToken, upload.single("avatar"), updateProfile);
router.put("/change-password", verifyToken, changePassword);

export default router;
