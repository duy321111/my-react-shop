My React Shop

Ứng dụng thương mại điện tử 
---
Tính năng chính

| Tính năng | Mô tả |
| **Đăng nhập / Đăng ký** | JWT + Bcrypt, lưu token trong localStorage |
| **Quản lý sản phẩm** | CRUD, tìm kiếm, lọc theo danh mục/giá |
| **Giỏ hàng** | Thêm/xóa/sửa số lượng, lưu local khi chưa login |
| **Thanh toán** | Trang checkout, xác nhận đơn hàng |
| **Profile người dùng** | Cập nhật thông tin, xem lịch sử mua hàng |
| **Responsive** | Hoạt động mượt trên mobile & desktop |

---
##  Tech Stack
Frontend:  React, React Router, Axios, CSS Modules, Javascript
Backend:   Node.js, Express.js
Database:  MongoDB + Mongoose
Auth:      JWT + Bcrypt
Upload:    Multer (hình ảnh sản phẩm)

## Chạy local
  # 1. Clone repo
  git clone https://github.com/duy321111/my-react-shop.git
  cd my-react-shop

  # 2. Cài dependencies
   npm install
   
  # 3. Chạy
    # Terminal 1: Backend
    cd server && node server.js

    # Terminal 2: Frontend
    cd client && npm start
