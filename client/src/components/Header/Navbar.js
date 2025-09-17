import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="header__navbar">
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
        <li className="header__navbar-item header__navbar-item-has-notify">
          <a href="" className="header__navbar-item-link">
            <i className="header__navbar-icon fa-regular fa-bell"></i>
            Thông báo
          </a>
          <div className="header__notify">
            <header className="header__notify-header">
              <h3>Thông báo mới nhận</h3>
            </header>
            <ul className="header__notify-list">
              <li className="header__notify-item header__notify-item--viewed">
                <a href="" className="header__notify-link">
                  <img src="/img/deal.jpg" alt="" className="header__notify-img" />
                  <div className="header__notify-info">
                    <span className="header__notify-name">Nhanh lên kẻo lỡ trend!</span>
                    <span className="header__notify-description">
                      Sắm ngay quần áo abcxyz
                    </span>
                  </div>
                </a>
              </li>
            </ul>
            <footer className="header__notify-footer">
              <a href="" className="header__notify-footer-btn">Xem tất cả</a>
            </footer>
          </div>
        </li>

        <li className="header__navbar-item">
          <a href="" className="header__navbar-item-link">
            <i className="header__navbar-icon fa-regular fa-circle-question"></i>
            Trợ giúp
          </a>
        </li>

        {/* Nếu có user thì hiện avatar + tên, ngược lại thì hiện login/register */}
        {user ? (
          <li className="header__navbar-item header__navbar-user">
            <img
              src={
                user.avatar ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="avatar"
              className="header__navbar-user-img"
            />
            <span className="header__navbar-user-name">{user.name.split(" ").slice(0, 2).join(" ")}</span>
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
