import express from "express";
import { getBrandsByCategory } from "../controllers/categoryController.js";

const router = express.Router();

// Lấy brand theo category
router.get("/:categoryNameOrId/brands", getBrandsByCategory);

export default router;
