import React, { useState } from "react";
import styles from "../../assets/css/admin/login.module.css";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Đang kiểm tra...");

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setMessage("Đăng nhập thành công!");
        window.location.href = "/admin/dashboard";
      } else {
        setMessage(data.message || "Đăng nhập thất bại!");
      }
    } catch (err) {
      setMessage("Lỗi kết nối đến máy chủ!");
    }
  };

  return (
    <div className={styles.app_container}>
      <div className="grid">
        <div className="grid__row">
          <div className="grid__column-12">
            <div className={styles.admin__logo_wrap}>
              <div className={styles.header__logo}>
                <Link to="/" className={styles.header__logo_link}>
                  <img src="/img/logo-removebg-preview.png"
                    className={styles.header__logo_img} alt="Logo" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid__row">
          <div className="grid__column-12">
            <div className={styles.admin__login_wrap}>
              <form className={styles.login_form} onSubmit={handleSubmit}>
                <h1>Admin Login</h1>

                {message && (
                  <span className={message.includes("thành công") ? styles.success : styles.error}>
                    {message}
                  </span>
                )}

                <div className={styles.input_group}>
                  <input
                    type="email"
                    placeholder="Email đăng nhập"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className={styles.input_group}>
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className={styles.input_group}>
                  <input type="submit" value="Đăng nhập" />
                </div>
              </form>
            </div>

            <div className={styles.button}>
              <a href="#">Quên mật khẩu?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
