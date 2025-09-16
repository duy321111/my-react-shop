import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });
      alert(res.data.message);
      navigate("/login"); // Chuyển sang trang login sau khi đăng ký
    } catch (err) {
      if (err.response) {

        alert(err.response.data.message);
      } else if (err.request) {
        
        alert("Không nhận được phản hồi từ server");
      } else {

        alert(err.message);
      }
    }

  };

  return ( 
    <div className="app__container">
      <Header />
        <div class="modal__body">
          <div class="grid">
            <div className="grid__row">
              <div class="modal__body">
                <div className="auth-form">
                  <div className="auth-form__container">
                    <div className="auth-form__header">
                      <h3 className="auth-form__heading">Đăng ký</h3>
                      <Link to="/login" className="auth-form__switch-btn">
                        Đăng nhập
                      </Link>
                    </div>
                    <form className="auth-form__form" onSubmit={handleSubmit}>
                        <div className="auth-form__form">
                          <div className="auth-form__group">

                            <input type="text" className="auth-form_input" placeholder="Họ tên" value={name}
                            onChange={(e) => setName(e.target.value)}/>
                            
                            <input 
                              type="text" className="auth-form_input" placeholder="Email của bạn" value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                        
                            <input type="password" className="auth-form_input" placeholder="Mật khẩu" value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                       

                            <input type="password" className="auth-form_input" placeholder="Nhập lại mật khẩu" value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                          </div>
                        </div>
                        
                        <div className="auth-form__aside">
                          <p className="auth-form__policy-text">
                            Bằng việc đăng ký, bạn đã đồng ý với chúng tôi về
                            <a href="/" className="auth-form__text-link"> Điều khoản dịch vụ</a> &
                            <a href="/" className="auth-form__text-link"> Chính sách bảo mật</a>
                          </p>
                        </div>

                        <div className="auth-form__control">
                          <Link to="/" className="btn btn--normal auth-form__control-back">TRỞ LẠI</Link>
                          <button type ="submit" className="btn btn--primary">ĐĂNG KÝ</button>
                        </div>
                    </form>
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
        </div>
      <Footer />
    </div>
  );
};

export default Register;
