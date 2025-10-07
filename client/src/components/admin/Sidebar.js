import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../assets/css/admin/sidebar.module.css";

export default function AdminSidebar() {
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
    updateTime(); // gọi 1 lần khi load
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    setShowDialog(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("adminName");
    navigate("/admin/login");
  };

  return (
    <div className={styles.adminWrapper}>
      {/* Sidebar */}
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebar}>
          <div className={styles.logo}>
            Ididong <span>Admin</span>
          </div>

          <ul>
            <li><Link to="/admin">Trang chủ</Link></li>

            <li className={styles.menuGroup}>
              <span className={styles.menuItem}>Danh mục</span>
              <ul className={styles.submenu}>
                <li><Link to="/admin/catadd">Thêm danh mục</Link></li>
                <li><Link to="/admin/catlist">Danh sách danh mục</Link></li>
              </ul>
            </li>

            <li className={styles.menuGroup}>
              <span className={styles.menuItem}>Thương hiệu</span>
              <ul className={styles.submenu}>
                <li><Link to="/admin/brandadd">Thêm thương hiệu</Link></li>
                <li><Link to="/admin/brandlist">Danh sách thương hiệu</Link></li>
              </ul>
            </li>

            <li className={styles.menuGroup}>
              <span className={styles.menuItem}>Sản phẩm</span>
              <ul className={styles.submenu}>
                <li><Link to="/admin/productadd">Thêm sản phẩm</Link></li>
                <li><Link to="/admin/productlist">Danh sách sản phẩm</Link></li>
              </ul>
            </li>

             <li className={styles.menuGroup}>
              <span className={styles.menuItem}>Hoá đơn</span>
              <ul className={styles.submenu}>
                <li><Link to="/admin/orderlist">Danh sách hoá đơn</Link></li>
              </ul>
            </li>

            <li><Link to="/admin/slider">Slider</Link></li>
            <li><Link to="/admin/adminlist">Nội bộ</Link></li>
            <li><Link to="/admin/customerlist">Khách hàng</Link></li>
          </ul>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className={styles.content}>
        <div className={styles.topbar}>
      
          <div className={styles.time}>{time}</div>

          <div className={styles.userInfo}>{adminName}</div>

          <button className={styles.btnLogout} onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>

        <div className={styles.mainContent}>
          <h1>Chào mừng đến trang quản trị!</h1>
        </div>
      </div>

      {/* Hộp thoại xác nhận */}
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
    </div>
  );
}
