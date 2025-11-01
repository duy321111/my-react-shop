import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Navbar() {
  // Lấy user từ localStorage ngay khi component khởi tạo
  const cachedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(cachedUser || null);
  const [form, setForm] = useState({
    name: cachedUser?.name || "",
    avatar: cachedUser?.avatar || "",
    phone: cachedUser?.phone || "",
    gender: cachedUser?.gender || "",
    email: cachedUser?.email || "",
    province: "",
    ward: "",
    detail: ""
  });

  // useEffect gọi API để cập nhật dữ liệu mới nhất
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          const data = res.data;
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data)); // update cache
          
          // Chỉ setForm nếu dữ liệu khác để tránh render thừa
          setForm(prev => ({
            ...prev,
            name: data.name || prev.name,
            avatar: data.avatar || prev.avatar,
            phone: data.phone || prev.phone,
            gender: data.gender || prev.gender,
            email: data.email || prev.email
          }));
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem("user");
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");  
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="header__navbar hide-on-moblie-tablet">
      <ul className="header__navbar-list">
        <li className="header__navbar-item header__navbar-item-has-qr header__navbar-item--separate">
          Vào cửa hàng trên ứng dụng
          <div className="header__qr">
            <img src="/img/qr_code.png" alt="QR code" className="header__qr-img" />
            <div className="header__qr-apps">
              <a href="" className="header__qr-link">
                <img
                  src="/img/Google-Play-Logo.png"
                  alt="ggplay"
                  className="header__qr-download-img"
                />
              </a>
              <a href="" className="header__qr-link">
                <img
                  src="/img/appstore.png"
                  alt="appstore"
                  className="header__qr-download-img"
                />
              </a>
            </div>
          </div>
        </li>

        <li className="header__navbar-item">
          <span className="header__navbar-title--no-pointer">Kết nối </span>
          <a href="" className="header__navbar-icon-link">
            <i className="header__navbar-icon fa-brands fa-facebook"></i>
          </a>
          <a href="" className="header__navbar-icon-link">
            <i className="header__navbar-icon fa-brands fa-instagram"></i>
          </a>
        </li>
      </ul>

      <ul className="header__navbar-list">
        <li className="header__navbar-item">
          <a href="" className="header__navbar-item-link">
            <i className="header__navbar-icon fa-regular fa-circle-question"></i>
            Trợ giúp
          </a>
        </li>

        {user ? (
          <li className="header__navbar-item header__navbar-user">
            <img
              src={form.avatar ? `http://localhost:5000${form.avatar}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="avatar"
              className="header__navbar-user-img"
            />
            <span className="header__navbar-user-name">
              {user.name ? user.name.split(" ").slice(0, 2).join(" ") : "Người dùng"}
            </span>
            <ul className="header__navbar-user-menu">
              <li className="header__navbar-user-item">
                <Link to="/profile">Tài khoản của tôi</Link>
              </li>
              <li className="header__navbar-user-item">
                <Link to="/orders">Đơn mua</Link>
              </li>
              <li className="header__navbar-user-item header__navbar-user-item--separate">
                <button onClick={handleLogout}>Đăng xuất</button>
              </li>
            </ul>
          </li>
        ) : (
          <>
            <li className="header__navbar-item header__navbar-item--strong header__navbar-item--separate">
              <Link to="/register">Đăng ký</Link>
            </li>
            
            <li className="header__navbar-item header__navbar-item--strong">
              <Link to="/login">Đăng nhập</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
