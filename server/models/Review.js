// models/Review.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // liên kết sản phẩm
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },       // liên kết người dùng
    rating: { type: Number, required: true, min: 1, max: 5 },                          // số sao
    comment: { type: String },                                                         // nội dung đánh giá
  },
  { timestamps: true } // createdAt & updatedAt
);

export default mongoose.model("Review", reviewSchema);
