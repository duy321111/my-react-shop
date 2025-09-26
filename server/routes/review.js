import express from "express";
import { getReviewsByProduct } from "../controllers/reviewController.js";

const router = express.Router();

// Lấy review theo productId
router.get("/product/:productId", getReviewsByProduct);

export default router;
