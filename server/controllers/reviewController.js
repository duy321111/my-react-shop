import mongoose from "mongoose";
import Review from "../models/Review.js";

export const getReviewsByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "ProductId không hợp lệ" });
    }

    const reviews = await Review.find({ productId })
                                .populate("userId", "name");

    const safeReviews = reviews.map(r => ({
      _id: r._id,
      rating: r.rating,
      comment: r.comment,
      userName: r.userId?.name || "Unknown",
      createdAt: r.createdAt
    }));

    res.json(safeReviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server: " + err.message });
  }
};


export const createReview = async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;

    // Kiểm tra hợp lệ ID
    if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "productId hoặc userId không hợp lệ" });
    }

    // Kiểm tra số sao
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Số sao phải từ 1 đến 5" });
    }

    // Tạo mới review
    const newReview = new Review({
      productId: new mongoose.Types.ObjectId(productId),
      userId: new mongoose.Types.ObjectId(userId),
      rating,
      comment,
    });

    await newReview.save();

    res.status(201).json({
      message: "Đánh giá đã được gửi thành công",
      review: newReview,
    });
  } catch (err) {
    console.error("Lỗi khi tạo review:", err);
    res.status(500).json({ message: "Lỗi server: " + err.message });
  }
};
