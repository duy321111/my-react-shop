import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import userRoutes from "./routes/user.js";

app.use("/api/users", userRoutes);

const uri = process.env.MONGO_URI;
console.log("🔍 MONGO_URI:", uri); // debug

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection failed:", err));
