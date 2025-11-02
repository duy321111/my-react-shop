# 🛍️ My React Shop

> **Ứng dụng thương mại điện tử **  
> Quản lý **sản phẩm · giỏ hàng · thanh toán · người dùng · quản trị hệ thống**

---

## ✨ Giới thiệu

**My React Shop** là một ứng dụng thương mại điện tử được xây dựng với **ReactJS (Frontend)** và **Node.js + Express + MongoDB (Backend)**.  
Người dùng có thể xem, tìm kiếm và mua sản phẩm, trong khi quản trị viên có quyền quản lý toàn bộ dữ liệu sản phẩm, đơn hàng và tài khoản.

---

## 🚀 Tính năng chính

| Nhóm chức năng | Mô tả chi tiết |
|----------------|----------------|
| 🧑‍💼 **Đăng nhập / Đăng ký** | Xác thực bằng **JWT + Bcrypt**, lưu token trong `localStorage`. Hỗ trợ đăng ký nhanh, đăng nhập an toàn. |
| 🏠 **Trang chủ (Home)** | Hiển thị **banner quảng cáo động**, danh sách sản phẩm nổi bật, và các thương hiệu phổ biến. |
| 🏷️ **Danh mục & Thương hiệu** | Lọc sản phẩm theo **danh mục**, **thương hiệu**. |
| 🔍 **Tìm kiếm & Lọc nâng cao** | Tìm sản phẩm theo tên, lọc theo **giá**, **số lượng bán**, **Sản phẩm mới**. |
| 🛒 **Giỏ hàng (Cart)** | Thêm, xóa, chỉnh số lượng sản phẩm.|
| 💳 **Thanh toán (Checkout)** | Gồm bước xác nhận thông tin, lựa chọn phương thức thanh toán và lưu đơn hàng vào database. |
| 📦 **Đơn hàng (Order History)** | Người dùng có thể xem chi tiết các đơn hàng đã đặt, trạng thái giao hàng. |
| 👤 **Trang hồ sơ (Profile)** | Cho phép người dùng cập nhật tên, email, địa chỉ, ảnh đại diện, mật khẩu. |
| 🛠️ **Trang quản trị (Admin Dashboard)** | Quản lý **sản phẩm**, **người dùng**, **đơn hàng**,**danh mục**, **tài khoản nhân viên**, **thương hiệu** và xem **thống kê doanh thu** bằng biểu đồ. |
| 📊 **Thống kê & Biểu đồ** | Thống kê doanh thu, số lượng đơn hàng. |
| 📱 **Responsive Design** | Giao diện được tối ưu cho **desktop, tablet và mobile**, đảm bảo trải nghiệm nhất quán. |

---

## 🧱 Công nghệ sử dụng (Tech Stack)

| Thành phần | Công nghệ |
|-------------|------------|
| **Frontend** | React.js · React Router · CSS · HTML · JavaScript |
| **Backend** | Node.js · Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT + Bcrypt |
| **Upload File** | Multer (upload ảnh sản phẩm) |
| **Charts / Dashboard** | Recharts (biểu đồ thống kê admin) |

---

## ⚙️ Hướng dẫn cài đặt & chạy ứng dụng

### 1️⃣ Clone repository và cài dependencies
```bash
git clone https://github.com/duy321111/my-react-shop
cd my-react-shop
npm install
```

---

### 2️⃣ Chạy ứng dụng cục bộ (Local)

#### 💻 Terminal 1 → Backend
```bash
cd server
node server.js
# Server chạy tại: http://localhost:5000
```

#### 💻 Terminal 2 → Frontend
```bash
cd client
npm start
# Ứng dụng chạy tại: http://localhost:3000
```

---

### 🧰 Tài khoản demo

| Vai trò | Email | Mật khẩu |
|----------|--------|----------|
| **Admin** | admin@example.com | 123456 |
| **Khách hàng** | user@example.com | 123456 |

>  Dữ liệu demo được khởi tạo sẵn trong cơ sở dữ liệu để có thể trải nghiệm các chức năng chính như: đăng nhập, đặt hàng, xem sản phẩm, chỉnh sửa hồ sơ, v.v.

---

## 🖼 Demo giao diện

> Dưới đây là một số hình ảnh minh họa giao diện ứng dụng:

- 🏠 **Trang chủ:**  
  ![Home Page Screenshot](./demo/home.png)

- 🛒 **Trang giỏ hàng:**  
  ![Cart Page Screenshot](./demo/cart.png)

- ⚙️ **Dashboard quản trị:**  
  ![Admin Dashboard Screenshot](./demo/admin.png)
---

## 📂 Cấu trúc thư mục

```
my-react-shop/
│
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/     # Component giao diện
│   │   ├── pages/          # Trang Home, Cart, Profile, Admin,...
│   │   ├── assets/         # CSS
│   │   ├── utils/     
│   │   └── App.js
│   └── package.json
│
├── server/                 # Backend (Node.js + Express)
│   ├── models/             # Mongoose models (User, Product, Order,...)
│   ├── routes/             # Các route API
│   ├── controllers/        # Xử lý logic nghiệp vụ
│   ├── config/             # Kết nối DB, JWT key, cấu hình server
│   ├── server.js           # File khởi động backend
│   └── package.json
│
├── demo/                   # Hình ảnh minh họa 
│   ├── home.png
│   ├── cart.png
│   └── admin.png
│
├── .gitignore
├── README.md
└── package.json
```

## 💬 Liên hệ

> 👤 **Nguyễn Trung Duy**  
> 📧 Email: duy321111@gmail.com  
> 🌐 GitHub: [duy321111](https://github.com/duy321111)
