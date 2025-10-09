// routes/brandRoutes.js
import express from "express";
import { getAllBrands, updateBrand, deleteBrand, addBrand } from "../controllers/brandController.js";

const router = express.Router();


router.post("/add", addBrand);
router.put("/update/:id", updateBrand);
router.delete("/:id", deleteBrand);
router.get("/", getAllBrands);


export default router;
