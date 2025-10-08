import express from "express";
import { getBrandsByCategory, getAllCategories} from "../controllers/categoryController.js";

const router = express.Router();

// Lấy brand theo category
router.get("/:categoryNameOrId/brands", getBrandsByCategory);
router.get("/", getAllCategories);

export default router;
