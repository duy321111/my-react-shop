import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));


// Routes
app.use("/auth", authRoutes);


app.use("/upload", uploadRoutes);

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// Start server
app.listen(5000, () => console.log("Server running on 5000"));
