import Order from "../models/Order.js";
import mongoose from "mongoose";

const canAccessOrder = (req, orderUserId) => {
  if (!req.user?.id || !orderUserId) return false;
  return orderUserId.toString() === req.user.id;
};

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      userId: req.user.id,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi tạo đơn hàng" });
  }
};

//Lấy danh sách đơn hàng của 1 người dùng
export const getOrdersByUser = async (req, res) => {
  try {
    if (req.params.userId !== req.user.id) {
      return res.status(403).json({ message: "Bạn không có quyền xem đơn hàng của người khác" });
    }

    const orders = await Order.find({ userId: req.params.userId })
      .populate("items.productId", "name image")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng" });
  }
};

// Lấy chi tiết 1 đơn hàng theo ID
export const getOrderDetail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("items.productId", "name image price");
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    if (!canAccessOrder(req, order.userId)) {
      return res.status(403).json({ message: "Bạn không có quyền xem đơn hàng này" });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi lấy chi tiết đơn hàng" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email") // thông tin người mua
      .populate("items.productId", "name") // tên sản phẩm
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách hoá đơn" });
  }
};

// Cập nhật trạng thái đơn hàng (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    res.status(200).json({ message: "Cập nhật trạng thái thành công", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi cập nhật trạng thái đơn hàng" });
  }
};

export const getOrderStats = async (req, res) => {
  try {
    // Tổng số đơn hàng
    const totalOrders = await Order.countDocuments();

    // Tổng doanh thu
    const totalRevenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    // Số khách hàng
    const totalCustomersAgg = await Order.aggregate([
      { $group: { _id: "$userId" } },
      { $count: "total" },
    ]);
    const totalCustomers = totalCustomersAgg[0]?.total || 0;

    // Đơn hàng đang xử lý
    const pendingOrders = await Order.countDocuments({ status: "Đang xử lý" });

    // Doanh thu theo tháng (6 tháng gần nhất)
    const monthlyRevenueAgg = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const monthlyRevenue = monthlyRevenueAgg.map((item) => ({
      month: `Tháng ${item._id}`,
      revenue: item.revenue,
    }));

    res.json({
      overview: { totalOrders, totalRevenue, totalCustomers, pendingOrders },
      monthlyRevenue,
    });
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu thống kê:", err);
    res.status(500).json({ message: "Server error" });
  }
};