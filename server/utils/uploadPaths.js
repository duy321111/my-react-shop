import fs from "fs";
import path from "path";

export const uploadDir = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.resolve(process.cwd(), "uploads");

export const ensureUploadDir = () => {
  fs.mkdirSync(uploadDir, { recursive: true });
};

export const getUploadUrl = (filename) => `/uploads/${filename}`;

export const getUploadFilePath = (filename) => path.join(uploadDir, filename);
