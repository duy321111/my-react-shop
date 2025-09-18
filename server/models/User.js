import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  phone: { type: String },
  addresses: [
    {
      province: String,
      ward: String,
      detail: String,
      isDefault: { type: Boolean, default: false }
    }
  ]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
