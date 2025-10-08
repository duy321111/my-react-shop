// routes/brandRoutes.js
import express from "express";
import { getAllBrands, updateBrand, deleteBrand, createBrand } from "../controllers/brandController.js";

const router = express.Router();

router.post("/", createBrand);
router.put("/update/:id", updateBrand);
router.delete("/:id", deleteBrand);
router.get("/", getAllBrands);


export default router;
