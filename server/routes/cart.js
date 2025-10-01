import express from "express";
import { addToCart, getCart, updateCartItem, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);               // thêm vào giỏ
router.get("/:userId", getCart);           // lấy giỏ hàng của 1 user
router.put("/:userId/:productId", updateCartItem); // cập nhật số lượng
router.delete("/:userId/:productId", removeFromCart); // xóa sản phẩm

export default router;
