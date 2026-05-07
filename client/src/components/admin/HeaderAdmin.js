import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/admin/header.module.css";

export default function HeaderAdmin() {
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [time, setTime] = useState("");

    const adminName = localStorage.getItem("adminName") || "Admin";

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            setTime(formattedTime);
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => setShowDialog(true);

    const confirmLogout = () => {
        localStorage.removeItem("adminName");
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    return (
        <>
            {/* 🔝 Thanh header */}
            <div className={styles.topbar}>
                <div className={styles.time}>Time: {time}</div>
                <div className={styles.userInfo}>{adminName}</div>
                <button className={styles.btnLogout} onClick={handleLogout}>
                    Đăng xuất
                </button>
            </div>

            {/*  Hộp thoại xác nhận đăng xuất */}
            {showDialog && (
                <div className={styles.dialogOverlay}>
                    <div className={styles.dialogContent}>
                        <p>Bạn có muốn đăng xuất khỏi tài khoản?</p>
                        <div className={styles.dialogActions}>
                            <button
                                className={`${styles.btn} ${styles.btnYes}`}
                                onClick={confirmLogout}
                            >
                                Đồng ý
                            </button>
                            <button
                                className={`${styles.btn} ${styles.btnNo}`}
                                onClick={() => setShowDialog(false)}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
