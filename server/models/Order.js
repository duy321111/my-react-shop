import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String },
});

const addressSchema = new mongoose.Schema({
  province: String,
  ward: String,
  detail: String,
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["cod", "bank"],
      default: "cod",
    },
    address: addressSchema,
    status: {
      type: String,
      enum: ["Đang xử lý", "Đang giao hàng", "Đã giao"],
      default: "Đang xử lý",
    },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
