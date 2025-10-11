import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String },
  brands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }] // nhiều brand
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
