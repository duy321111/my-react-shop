# 🛍️ My React Shop

> **Ứng dụng thương mại điện tử **  
> Quản lý **sản phẩm · giỏ hàng · thanh toán · người dùng · quản trị hệ thống**

---

## ✨ Giới thiệu

**My React Shop** là một ứng dụng thương mại điện tử được xây dựng với **ReactJS (Frontend)** và **Node.js + Express + MongoDB (Backend)**.  
Người dùng có thể xem, tìm kiếm và mua sản phẩm, trong khi quản trị viên có quyền quản lý toàn bộ dữ liệu sản phẩm, đơn hàng và tài khoản.

---

## 🚀 Tính năng chính

| Nhóm chức năng                          | Mô tả chi tiết                                                                                                                                        |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🧑‍💼 **Đăng nhập / Đăng ký**              | Xác thực bằng **JWT + Bcrypt**, lưu token trong `localStorage`. Hỗ trợ đăng ký nhanh, đăng nhập an toàn.                                              |
| 🏠 **Trang chủ (Home)**                 | Hiển thị **banner quảng cáo động**, danh sách sản phẩm nổi bật, và các thương hiệu phổ biến.                                                          |
| 🏷️ **Danh mục & Thương hiệu**           | Lọc sản phẩm theo **danh mục**, **thương hiệu**.                                                                                                      |
| 🔍 **Tìm kiếm & Lọc nâng cao**          | Tìm sản phẩm theo tên, lọc theo **giá**, **số lượng bán**, **Sản phẩm mới**.                                                                          |
| 🛒 **Giỏ hàng (Cart)**                  | Thêm, xóa, chỉnh số lượng sản phẩm.                                                                                                                   |
| 💳 **Thanh toán (Checkout)**            | Gồm bước xác nhận thông tin, lựa chọn phương thức thanh toán và lưu đơn hàng vào database.                                                            |
| 📦 **Đơn hàng (Order History)**         | Người dùng có thể xem chi tiết các đơn hàng đã đặt, trạng thái giao hàng.                                                                             |
| 👤 **Trang hồ sơ (Profile)**            | Cho phép người dùng cập nhật tên, email, địa chỉ, ảnh đại diện, mật khẩu.                                                                             |
| 🛠️ **Trang quản trị (Admin Dashboard)** | Quản lý **sản phẩm**, **người dùng**, **đơn hàng**,**danh mục**, **tài khoản nhân viên**, **thương hiệu** và xem **thống kê doanh thu** bằng biểu đồ. |
| 📊 **Thống kê & Biểu đồ**               | Thống kê doanh thu, số lượng đơn hàng.                                                                                                                |
| 📱 **Responsive Design**                | Giao diện được tối ưu cho **desktop, tablet và mobile**, đảm bảo trải nghiệm nhất quán.                                                               |

---

## 🧱 Công nghệ sử dụng (Tech Stack)

| Thành phần             | Công nghệ                                         |
| ---------------------- | ------------------------------------------------- |
| **Frontend**           | React.js · React Router · CSS · HTML · JavaScript |
| **Backend**            | Node.js · Express.js                              |
| **Database**           | MongoDB + Mongoose                                |
| **Authentication**     | JWT + Bcrypt                                      |
| **Upload File**        | Multer (upload ảnh sản phẩm)                      |
| **Charts / Dashboard** | Recharts (biểu đồ thống kê admin)                 |

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

### 3️⃣ Chạy bằng Docker

Yêu cầu trước:

- Cài Docker Desktop
- Bật Docker Desktop trước khi chạy lệnh

#### Bước 1: Di chuyển về thư mục gốc dự án

```bash
cd my-react-shop
```

#### Bước 2: Build và chạy toàn bộ hệ thống

```bash
cp .env.docker.example .env.docker
# Sửa MONGO_URI_DOCKER nếu bạn muốn dùng MongoDB Cloud
docker compose --env-file .env.docker up --build
```

Hệ thống sẽ khởi tạo 3 service:

- `mongo` (MongoDB)
- `server` (Express API, port 5000)
- `client` (React app, port 3000)

#### Bước 3: Truy cập ứng dụng

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

#### Bước 4: Chạy nền (background)

```bash
docker compose --env-file .env.docker up -d --build
```

#### Bước 5: Xem log

```bash
docker compose --env-file .env.docker logs -f
```

Hoặc xem từng service:

```bash
docker compose --env-file .env.docker logs -f server
docker compose --env-file .env.docker logs -f client
docker compose --env-file .env.docker logs -f mongo
```

#### Bước 6: Dừng hệ thống

```bash
docker compose --env-file .env.docker down
```

Nếu muốn xóa cả volume database:

```bash
docker compose --env-file .env.docker down -v
```

#### Biến môi trường Docker

File mẫu đã có sẵn:

- `.env.docker.example`
- `server/.env.example` (dành cho backend chạy local)

Khuyến nghị tách môi trường để không ảnh hưởng dữ liệu:

- Local backend: dùng DB `myreactshop_local`
- Docker backend: dùng DB `myreactshop_docker`

Trong Docker Compose, backend đọc biến:

- `MONGO_URI_DOCKER`
- `JWT_SECRET_DOCKER`

Từ file `.env.docker` (thông qua `--env-file .env.docker`).

---

### 🧰 Tài khoản demo

| Vai trò        | Email            | Mật khẩu |
| -------------- | ---------------- | -------- |
| **Admin**      | duy@example.com  | 123      |
| **Khách hàng** | duy123@gmail.com | 123      |

> Dữ liệu demo được khởi tạo sẵn trong cơ sở dữ liệu để có thể trải nghiệm các chức năng chính như: đăng nhập, đặt hàng, xem sản phẩm, chỉnh sửa hồ sơ, v.v.

---

## 🖼 Demo giao diện

> Dưới đây là một số hình ảnh minh họa giao diện ứng dụng:

### 👤 **Giao diện người dùng (Customer)**

- 🏠 **Trang chủ:**  
  ![Home Page Screenshot](./demo/customer/home.png)

- 🛒 **Giỏ hàng:**  
  ![Cart Page Screenshot](./demo/customer/cart.png)

- 🛍️ **Danh mục sản phẩm:**  
  ![Category Page Screenshot](./demo/customer/category.png)

- ✅ **Thanh toán:**  
  ![Checkout Page Screenshot](./demo/customer/checkout.png)

- 🔐 **Đăng nhập:**  
  ![Login Page Screenshot](./demo/customer/login.png)

- 📦 **Đơn hàng:**  
  ![Order Page Screenshot](./demo/customer/order.png)

- 📄 **Chi tiết đơn hàng:**  
  ![Order Detail Screenshot](./demo/customer/orderdetail.png)

- 🛒 **Chi tiết sản phẩm:**  
  ![Product Detail Screenshot](./demo/customer/productdetail.png)

- 👤 **Hồ sơ người dùng:**  
  ![Profile Page Screenshot](./demo/customer/profile.png)

- 📝 **Đăng ký:**  
  ![Register Page Screenshot](./demo/customer/register.png)

---

### ⚙️ **Giao diện quản trị (Admin)**

- 📊 **Dashboard quản trị:**  
  ![Admin Dashboard Screenshot](./demo/admin/dashboard.png)

- 🏷️ **Danh sách thương hiệu:**  
  ![Brand List Screenshot](./demo/admin/brand_list.png)

- 📂 **Danh sách danh mục:**  
  ![Category List Screenshot](./demo/admin/category_list.png)

- 👥 **Danh sách khách hàng:**  
  ![Customer List Screenshot](./demo/admin/customer_list.png)

- 📑 **Danh sách đơn hàng:**  
  ![Order List Screenshot](./demo/admin/order_list.png)

- 📦 **Danh sách sản phẩm:**  
  ![Product List Screenshot](./demo/admin/product_list.png)

- 🖼️ **Danh sách slider:**  
  ![Slider List Screenshot](./demo/admin/slider_list.png)

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
