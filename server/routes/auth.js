import express from "express";
import { register, login, getMe, updateProfile } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { changePassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getMe);
router.put("/me", verifyToken, updateProfile);
router.put("/change-password", verifyToken, changePassword);

export default router;
