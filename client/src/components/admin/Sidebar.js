import React from "react";
import { Link } from "react-router-dom";
import styles from "../../assets/css/admin/sidebar.module.css";

export default function AdminSidebar() {
  return (
    <div className={styles.adminWrapper}>
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebar}>
          <div className={styles.logo}>
            Ididong <span>Admin</span>
          </div>

          <ul>
            <li><Link to="/admin/dashboard">Trang chủ</Link></li>

            <li>
              <details>
                <summary className={styles.menuItem}>Danh mục</summary>
                <ul className={styles.submenu}>
                  <li><Link to="/admin/addcategory">Thêm danh mục</Link></li>
                  <li><Link to="/admin/category">Danh sách danh mục</Link></li>
                </ul>
              </details>
            </li>

            <li>
              <details>
                <summary className={styles.menuItem}>Thương hiệu</summary>
                <ul className={styles.submenu}>
                  <li><Link to="/admin/addbrand">Thêm thương hiệu</Link></li>
                  <li><Link to="/admin/brand">Danh sách thương hiệu</Link></li>
                </ul>
              </details>
            </li>

            <li>
              <details>
                <summary className={styles.menuItem}>Sản phẩm</summary>
                <ul className={styles.submenu}>
                  <li><Link to="/admin/addproduct">Thêm sản phẩm</Link></li>
                  <li><Link to="/admin/products">Danh sách sản phẩm</Link></li>
                </ul>
              </details>
            </li>

            <li>
              <details>
                <summary className={styles.menuItem}>Hoá đơn</summary>
                <ul className={styles.submenu}>
                  <li><Link to="/admin/orders">Danh sách hoá đơn</Link></li>
                </ul>
              </details>
            </li>

            <li><Link to="/admin/slider">Slider</Link></li>
            <li><Link to="/admin/adminlist">Nội bộ</Link></li>
            <li><Link to="/admin/customerlist">Khách hàng</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
