import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    avatar: "",
    phone: "",
    gender: "",
    email: "",
    province: "",
    ward: "",
    detail: ""
  });

  // Lấy dữ liệu user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          setUser(res.data);
          setForm({
            name: res.data.name || "",
            avatar: res.data.avatar || "",
            phone: res.data.phone || "",
            gender: res.data.gender || "",
            email: res.data.email || "",
            province: "",
            ward: "",
            detail: ""
          });
        })
        .catch(() => setUser(null));
    }
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch(`http://localhost:5000/upload/${user._id}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setForm({ ...form, avatar: data.url });
    } catch (err) {
      console.error("Upload error:", err);
    }
  };


  const handleSaveProfile = () => {
    const token = localStorage.getItem("token");

    axios.put(
      "http://localhost:5000/auth/me",
      {
        name: form.name,
        avatar: form.avatar,
        phone: form.phone,
        gender: form.gender
      },
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
    )
    .then(res => setUser(res.data))
    .catch(err => console.error(err.response?.data || err.message));
  };

    const handleAddAddress = () => {
    const token = localStorage.getItem("token");
    const newAddresses = [...(user.addresses || []), {
      province: form.province,
      ward: form.ward,
      detail: form.detail,
      isDefault: false
    }];

    axios.put(
      "http://localhost:5000/auth/me",
      { addresses: newAddresses },
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
    )
    .then(res => {
      setUser(res.data); 
      setForm({ ...form, province: "", ward: "", detail: "" });
    })
    .catch(err => console.error(err.response?.data || err.message));
  };  

  const handleChangePassword = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios.put(
      "http://localhost:5000/auth/change-password", // cần backend hỗ trợ route này
      {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      },
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
    )
    .then(res => {
      alert("Đổi mật khẩu thành công!");
      setForm({ ...form, currentPassword: "", newPassword: "" }); // reset form
    })
    .catch(err => {
      alert(err.response?.data?.message || "Đổi mật khẩu thất bại");
    });
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="app__container">
      <Header />
      <div className="profile-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="avatar-box">
            <img src={`http://localhost:5000${form.avatar}`} alt="avatar" className="avatar" />
            <label htmlFor="upload" className="upload-btn"><p>Thay ảnh</p></label>
            <input type="file" id="upload" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
            <h3 className="username">{user.name}</h3>
          </div>

          <div className="menu">
            <p className="menu-title">Tài Khoản Của Tôi</p>
            <ul>
              <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Hồ Sơ</li>
              <li className={activeTab === "address" ? "active" : ""} onClick={() => setActiveTab("address")}>Địa Chỉ</li>
              <li className={activeTab === "password" ? "active" : ""} onClick={() => setActiveTab("password")}>Đổi Mật Khẩu</li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="profile-main">
          {activeTab === "profile" && (
            <form className="profile-form" onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
              <div className="form-group">
                <label>Tên</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={form.email} disabled />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input type="text" name="phone" value={form.phone} onChange={handleChange} />
              </div>
              <button className="btn-save" type="submit">Lưu</button>
            </form>
          )}

          {activeTab === "address" && (
            <>
              <ul>
                {user.addresses?.map((addr, index) => (
                  <li key={addr._id || index}>
                    {addr.detail}, {addr.ward}, {addr.province}
                  </li>
                ))}
              </ul>
              <input type="text" name="province" placeholder="Tỉnh/Thành phố" value={form.province} onChange={handleChange} />
              <input type="text" name="ward" placeholder="Phường/Xã" value={form.ward} onChange={handleChange} />
              <input type="text" name="detail" placeholder="Số nhà, đường" value={form.detail} onChange={handleChange} />
              <button onClick={handleAddAddress}>Thêm</button>
            </>
          )}

          {activeTab === "password" && (
            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label>Mật khẩu hiện tại</label>
                <input type="password" name="currentPassword" value={form.currentPassword || ""} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Mật khẩu mới</label>
                <input type="password" name="newPassword" value={form.newPassword || ""} onChange={handleChange} />
              </div>
              <button className="btn-save" type="submit">Đổi mật khẩu</button>
            </form>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
