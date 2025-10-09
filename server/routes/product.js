import express from "express";
import { getProducts, getProductById, addProduct, deleteProduct, updateProduct } from "../controllers/productController.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Khởi tạo router
const router = express.Router();

// Xác định __dirname cho ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình multer để lưu trữ ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../client/public/img")); // Lưu vào thư mục public/uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

// Định nghĩa các route
router.get("/", getProducts); // GET /api/products?category=laptop&brand=hp
router.get("/:id", getProductById); // GET /api/products/:id
router.delete("/:id", deleteProduct);
router.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 }, // Ảnh chính
    { name: "images", maxCount: 10 }, // Ảnh phụ
  ]),
  addProduct
);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  updateProduct
);

export default router;