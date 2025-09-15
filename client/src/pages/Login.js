import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  return (
    <div className="app__container">
        <Header />
        <div className="grid">
            <div className="grid__row">
                <div class="modal__body">
                    <div className="auth-form">
                    <div className="auth-form__container">
                        <div className="auth-form__header">
                        <h3 className="auth-form__heading">Đăng nhập</h3>
                        <Link to="/register" className="auth-form__switch-btn">
                            Đăng ký
                        </Link>
                        </div>

                        <div className="auth-form__form">
                        <div className="auth-form__group">
                            <input type="text" className="auth-form_input" placeholder="Email của bạn" />
                        </div>

                        <div className="auth-form__group">
                            <input type="password" className="auth-form_input" placeholder="Mật khẩu" />
                        </div>
                        </div>

                        <div className="auth-form__aside">
                        <div className="auth-form__help">
                            <a href="/" className="auth-form__help-link auth-form__help-forgot">Quên mật khẩu</a>
                            <span className="auth-form__help-separate"></span>
                            <a href="/" className="auth-form__help-link">Cần trợ giúp?</a>
                        </div>
                        </div>

                        <div className="auth-form__control">
                        <Link to="/" className="btn btn--normal auth-form__control-back">TRỞ LẠI</Link>
                        <button className="btn btn--primary">ĐĂNG NHẬP</button>
                        </div>
                    </div>

                    <div className="auth-form__social">
                        <a href="/" className="auth-form__social--facebook btn btn--size-s btn--with-icon">
                        <i className="auth-form__social-icon fa-brands fa-square-facebook"></i>
                        <span className="auth-form__social--title">Kết nối với Facebook</span>
                        </a>
                        <a href="/" className="auth-form__social--google btn btn--size-s btn--with-icon">
                        <i className="auth-form__social-icon fa-brands fa-google"></i>
                        <span className="auth-form__social--title">Kết nối với Google</span>
                        </a>
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
