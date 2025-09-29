import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tên sản phẩm
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },            // Thương hiệu
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },

    origin: { type: String },               // Xuất xứ
    description: { type: String },          // Mô tả chi tiết

    image: { type: String, required: true }, // Ảnh đại diện
    images: [{ type: String }],              // Danh sách ảnh chi tiết

    priceOld: { type: Number, required: true },      // Giá gốc
    priceCurrent: { type: Number, required: true },  // Giá hiện tại
    saleOff: { type: Number, default: 0 },           // % giảm giá

    rating: { type: Number, default: 0, min: 0, max: 5 }, // Số sao trung bình
    sold: { type: Number, default: 0 },                  // Số lượng đã bán
    quantityAvailable: { type: Number, default: 0 },     // Số lượng còn lại

    isFavorite: { type: Boolean, default: false },       // Có nằm trong yêu thích không

    promotions: [                                        // Danh sách khuyến mãi
      { type: String }
    ]
  },
  { timestamps: true } // Tự động thêm createdAt & updatedAt
);

export default mongoose.model("Product", productSchema);
