import express from "express";
import { createOrder, getOrdersByUser, getOrderDetail, getAllOrders, updateOrderStatus} from "../controllers/orderController.js";

const router = express.Router();

// POST: Tạo đơn hàng
router.post("/", createOrder);

router.get("/all", getAllOrders);

// GET: Lấy đơn hàng theo userId
router.get("/:userId", getOrdersByUser);

// GET: Lấy chi tiết đơn hàng theo ID
router.get("/detail/:orderId", getOrderDetail);


router.put("/:orderId/status", updateOrderStatus);

export default router;
