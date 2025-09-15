import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const [avatar, setAvatar] = useState("https://via.placeholder.com/120");
  const [activeTab, setActiveTab] = useState("profile"); // tab mặc định

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="app__container">
      <Header />
      <div className="profile-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="avatar-box">
            <img src={avatar} alt="avatar" className="avatar" />
            <label htmlFor="upload" className="upload-btn">
              <p>Thay ảnh</p>
            </label>
            <input
              type="file"
              id="upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <h3 className="username">duyaaa0</h3>
          </div>

          <div className="menu">
            <p className="menu-title">Tài Khoản Của Tôi</p>
            <ul>
              <li
                className={activeTab === "profile" ? "active" : ""}
                onClick={() => setActiveTab("profile")}
              >
                Hồ Sơ
              </li>
              <li
                className={activeTab === "address" ? "active" : ""}
                onClick={() => setActiveTab("address")}
              >
                Địa Chỉ
              </li>
              <li
                className={activeTab === "password" ? "active" : ""}
                onClick={() => setActiveTab("password")}
              >
                Đổi Mật Khẩu
              </li>
           
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="profile-main">
          {activeTab === "profile" && (
            <>
              <h2>Hồ Sơ Của Tôi</h2>
              <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
              <form className="profile-form">
                <div className="form-group">
                  <label>Tên đăng nhập</label>
                  <input type="text" value="duyaaa0" disabled />
                </div>
                <div className="form-group">
                  <label>Tên</label>
                  <input type="text" value="Duy" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value="du******@gmail.com" />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input type="text" value="********26" />
                </div>
                <div className="form-group">
                  <label>Giới tính</label>
                  <div className="gender-options">
                    <label>
                      <input type="radio" name="gender" /> Nam
                    </label>
                    <label>
                      <input type="radio" name="gender" /> Nữ
                    </label>
                    <label>
                      <input type="radio" name="gender" /> Khác
                    </label>
                  </div>
                </div>
                <button className="btn-save">Lưu</button>
              </form>
            </>
          )}

          {activeTab === "address" && (
            <>
              <h2>Địa Chỉ</h2>
              <p>Quản lý địa chỉ nhận hàng của bạn</p>
              {/* demo */}
              <ul>
                <li>Thôn 7, Xã A, Huyện B</li>
                <li>Thôn 30, Xã C, Huyện D</li>
              </ul>
            </>
          )}

          {activeTab === "password" && (
            <>
              <h2>Đổi Mật Khẩu</h2>
              <form>
                <div className="form-group">
                  <label>Mật khẩu hiện tại</label>
                  <input type="password" />
                </div>
                <div className="form-group">
                  <label>Mật khẩu mới</label>
                  <input type="password" />
                </div>
                <button className="btn-save">Đổi mật khẩu</button>
              </form>
            </>
          )}

       
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
