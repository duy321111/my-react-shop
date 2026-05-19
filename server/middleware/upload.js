import multer from "multer";
import path from "path";
import { ensureUploadDir, uploadDir } from "../utils/uploadPaths.js";

ensureUploadDir();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });
export default upload;
