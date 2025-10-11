import express from "express";
import { getBrandsByCategory, getAllCategories, createCategory, updateCategory, deleteCategory} from "../controllers/categoryController.js";

const router = express.Router();

// Lấy brand theo category
router.get("/:categoryNameOrId/brands", getBrandsByCategory);
router.get("/", getAllCategories);
router.post("/", createCategory);
router.put("/update/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
