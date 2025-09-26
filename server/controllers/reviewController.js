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
