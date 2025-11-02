# My React Shop

> **Ứng dụng thương mại điện tử fullstack** – Quản lý sản phẩm, giỏ hàng, thanh toán và hồ sơ người dùng.

---

## Tính năng chính

| Tính năng | Mô tả |
|-----------|-------|
| **Đăng nhập / Đăng ký** | JWT + Bcrypt, lưu token trong `localStorage` |
| **Quản lý sản phẩm** | CRUD, tìm kiếm, lọc theo danh mục/giá |
| **Giỏ hàng** | Thêm/xóa/sửa số lượng, lưu local khi chưa login |
| **Thanh toán** | Trang checkout, xác nhận đơn hàng |
| **Profile người dùng** | Cập nhật thông tin, xem lịch sử mua hàng |
| **Responsive** | Hoạt động mượt trên mobile & desktop |

---

## Tech Stack

```text
Frontend:  React, React Router, Axios, CSS Modules, JavaScript
Backend:   Node.js, Express.js
Database:  MongoDB + Mongoose
Auth:      JWT + Bcrypt
Upload:    Multer (hình ảnh sản phẩm)
