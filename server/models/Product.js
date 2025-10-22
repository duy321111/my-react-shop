import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },

    origin: { type: String },
    description: { type: String },

    image: { type: String, required: true },
    images: [{ type: String }],

    priceOld: { type: Number, required: true },
    priceCurrent: { type: Number, required: true },
    saleOff: { type: Number, default: 0 },

    rating: { type: Number, default: 0, min: 0, max: 5 },
    sold: { type: Number, default: 0 },
    quantityAvailable: { type: Number, default: 0 },

    // Danh sách user thích sản phẩm
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    promotions: [{ type: String }],

    specifications: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
