import express from "express";
import { getReviewsByProduct,createReview } from "../controllers/reviewController.js";

const router = express.Router();

// Lấy danh sách review theo productId
router.get("/product/:productId", getReviewsByProduct);
router.post("/", createReview);

export default router;
