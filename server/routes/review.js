import express from "express";
import {
  getAllSliders,
  createSlider,
  updateSlider,
  deleteSlider
} from "../controllers/sliderController.js";

const router = express.Router();

// Lấy tất cả slider
router.get("/", getAllSliders);

// Thêm slider
router.post("/", createSlider);

// Cập nhật slider theo id
router.put("/:id", updateSlider);

// Xóa slider theo id
router.delete("/:id", deleteSlider);

export default router;
