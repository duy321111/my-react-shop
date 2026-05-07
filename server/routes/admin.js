// routes/adminRoutes.js
import express from "express";
import {
    loginAdmin,
    getAllAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
} from "../controllers/adminController.js";
import { verifyAdminToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.use(verifyAdminToken);

router.get("/", getAllAdmins);
router.post("/", createAdmin);
router.put("/update/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

export default router;
