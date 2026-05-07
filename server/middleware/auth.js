import jwt from "jsonwebtoken";

const getAdminSecret = () => process.env.JWT_SECRET || "secret-key";

export const verifyAdminToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Không có token" });

    jwt.verify(token, getAdminSecret(), (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token không hợp lệ" });

        if (!decoded?.role || !["admin", "staff"].includes(decoded.role)) {
            return res.status(403).json({ message: "Không có quyền truy cập" });
        }

        req.admin = decoded;
        next();
    });
};
