import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { notificationService } from "../services/notificationService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/auth/login", {
                email,
                password,
            });

            // Lưu cả token và user vào localStorage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setMessage("Đăng nhập thành công!");
            navigate("/");
        } catch (err) {
            notificationService.error(
                err.response?.data?.message || "Đăng nhập thất bại!",
            );
        }
    };

    return (
        <div className="app__container">
            <Header />
            <div className="grid">
                <div className="grid__row">
                    <div className="modal__body">
                        <div className="auth-form">
                            <div className="auth-form__container">
                                <div className="auth-form__header">
                                    <h3 className="auth-form__heading">
                                        Đăng nhập
                                    </h3>
                                    <Link
                                        to="/register"
                                        className="auth-form__switch-btn"
                                    >
                                        Đăng ký
                                    </Link>
                                </div>

                                <form
                                    className="auth-form__form"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="auth-form__group">
                                        <input
                                            type="text"
                                            className="auth-form_input"
                                            placeholder="Tên đăng nhập"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="auth-form__group">
                                        <input
                                            type="password"
                                            className="auth-form_input"
                                            placeholder="Mật khẩu"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>

                                    {message && (
                                        <span
                                            className={
                                                message.includes("thành công")
                                                    ? "login-success"
                                                    : "login-error"
                                            }
                                        >
                                            {message}
                                        </span>
                                    )}

                                    <div className="auth-form__control">
                                        <Link
                                            to="/"
                                            className="btn btn--normal auth-form__control-back"
                                        >
                                            TRỞ LẠI
                                        </Link>
                                        <button
                                            type="submit"
                                            className="btn btn--primary"
                                        >
                                            ĐĂNG NHẬP
                                        </button>
                                    </div>
                                </form>

                                <div className="auth-form__aside">
                                    <div className="auth-form__help">
                                        <a
                                            href="/"
                                            className="auth-form__help-link auth-form__help-forgot"
                                        >
                                            Quên mật khẩu
                                        </a>
                                        <span className="auth-form__help-separate"></span>
                                        <a
                                            href="/"
                                            className="auth-form__help-link"
                                        >
                                            Cần trợ giúp?
                                        </a>
                                    </div>
                                </div>

                                <div className="auth-form__social hide-on-mobile">
                                    <a
                                        href="/"
                                        className="auth-form__social--facebook btn btn--size-s btn--with-icon"
                                    >
                                        <img
                                            src="/img/icons8-facebook-48.png"
                                            alt="Facebook"
                                            className="auth-form__social-icon"
                                        />
                                        <span className="auth-form__social--title">
                                            Kết nối với Facebook
                                        </span>
                                    </a>
                                    <a
                                        href="/"
                                        className="auth-form__social--google btn btn--size-s btn--with-icon"
                                    >
                                        <img
                                            src="/img/icons8-google-48.png"
                                            alt="Google"
                                            className="auth-form__social-icon"
                                        />
                                        <span className="auth-form__social--title">
                                            Kết nối với Google
                                        </span>
                                    </a>
                                </div>

                                <div className="auth-form__social hide-on-pc-tablet">
                                    <a
                                        href="/"
                                        className="auth-form__social--facebook btn btn--size-s btn--with-icon"
                                    >
                                        <img
                                            src="/img/icons8-facebook-48.png"
                                            alt="Facebook"
                                            className="auth-form__social-icon"
                                        />
                                        <span className="auth-form__social--title">
                                            Kết nối với Facebook
                                        </span>
                                    </a>

                                    <a
                                        href="/"
                                        className="auth-form__social--google btn btn--size-s btn--with-icon"
                                    >
                                        <img
                                            src="/img/icons8-google-48.png"
                                            alt="Google"
                                            className="auth-form__social-icon"
                                        />
                                        <span className="auth-form__social--title">
                                            Kết nối với Google
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
