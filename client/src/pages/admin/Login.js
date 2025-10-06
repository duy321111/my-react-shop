import React, { useState } from "react";
import '../../assets/css/admin/login.css'
import { Link } from "react-router-dom";
export default function AdminLogin() {
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Đang kiểm tra...");

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminUser, adminPass }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        window.location.href = "/admin/dashboard";
      }
    } catch (err) {
      setMessage(" Lỗi kết nối đến máy chủ!");
    }
  };

  return (
    <div className="app_container">
      <div className="grid">
        <div className="grid__row">
          <div className="grid__column-12">
            <div className="admin__logo-wrap">
              <div className="header__logo">
                <Link to="/" className="header__logo-link">
                    <img src="/img/logo-removebg-preview.png" className="header__logo-img" alt="Logo" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="grid__row">
          <div className="grid__column-12">
            <div  className="admin__login-wrap">
              <form className="login-form" onSubmit={handleSubmit}>
                <h1>Admin Login</h1>

                {message && (
                  <span
                    className={message.includes("success") ? "success" : "error"}
                  >
                    {message}
                  </span>
                )}

                <div className="input-group">
                  <input
                    type="text"
                    placeholder=" Tên đăng nhập"
                    required
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    required
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <input type="submit" value=" Đăng nhập" />
                </div>
              </form>

            </div>
              <div className="button">
              <a href="#">Quên mật khẩu?</a>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
