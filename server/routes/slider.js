// routes/sliderRoutes.js
import express from "express";
import upload from "../middleware/upload.js";
import { createSlider, getAllSliders, updateSlider, deleteSlider } from "../controllers/sliderController.js";

const router = express.Router();

router.get("/", getAllSliders);
router.post("/", upload.single("image"), createSlider);
router.put("/:id", upload.single("image"), updateSlider);
router.delete("/:id", deleteSlider);

export default router;
