import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import productRoutes from "./routes/product.js";
import reviewRoutes from "./routes/review.js";
import categoryRoutes from "./routes/category.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import adminRoutes from "./routes/admin.js"
import brandRoutes from "./routes/brand.js";
import userRoutes from "./routes/user.js";
import sliderRoutes from "./routes/slider.js";
import { ensureUploadDir, uploadDir } from "./utils/uploadPaths.js";


dotenv.config();
ensureUploadDir();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(uploadDir));




// Routes
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/user", userRoutes);
app.use("/api/slider", sliderRoutes);

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// Start server
app.listen(5000, () => console.log("Server running on 5000"));
