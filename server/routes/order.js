import express from "express";
import { createOrder, getOrdersByUser, getOrderDetail, getAllOrders, updateOrderStatus, getOrderStats} from "../controllers/orderController.js";

const router = express.Router();

// POST: Tạo đơn hàng
router.post("/", createOrder);

router.get("/all", getAllOrders);
router.get("/stats", getOrderStats);
// GET: Lấy đơn hàng theo userId
router.get("/:userId", getOrdersByUser);

// GET: Lấy chi tiết đơn hàng theo ID
router.get("/detail/:orderId", getOrderDetail);


router.put("/:orderId/status", updateOrderStatus);

export default router;
