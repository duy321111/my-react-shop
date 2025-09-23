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
    detail: "",
    currentPassword: "",
    newPassword: "",
  });
  const [provinces, setProvinces] = useState([]); 
  const [wards, setWards] = useState([]); 

  // Fetch dữ liệu tỉnh/thành mới (cập nhật 2025) và user khi component mount
  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/v2/p/?depth=1") 
      .then((res) => {
        const updatedProvinces = res.data.filter(p => true); 
        setProvinces(updatedProvinces);
      })
      .catch((err) => console.error("Error fetching provinces 2025:", err));

    // Fetch dữ liệu user
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
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
            detail: "",
            currentPassword: "",
            newPassword: "",
          });
        })
        .catch(() => setUser(null));
    }
  }, []);

  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    setForm({ ...form, province: provinceCode, ward: "" });

    if (provinceCode) {
      axios
        .get(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`) 
        .then((res) => {
          setWards(res.data.wards || []); 
        })
        .catch((err) => console.error("Error fetching wards after merge:", err));
    } else {
      setWards([]);
    }
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Xử lý upload ảnh
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

  // Xử lý lưu hồ sơ
  const handleSaveProfile = () => {
    const token = localStorage.getItem("token");

    axios
      .put(
        "http://localhost:5000/auth/update",
        {
          name: form.name,
          avatar: form.avatar,
          phone: form.phone,
          gender: form.gender,
        },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      )
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err.response?.data || err.message));
  };

  const handleAddAddress = () => {
    const token = localStorage.getItem("token");
    const selectedProvince = provinces.find((p) => p.code === parseInt(form.province))?.name || "";
    const newAddresses = [
      ...(user.addresses || []),
      {
        province: selectedProvince, 
        ward: form.ward, 
        detail: form.detail,
        isDefault: false,
      },
    ];

    axios
      .put(
        "http://localhost:5000/auth/update",
        { addresses: newAddresses },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      )
      .then((res) => {
        setUser(res.data);
        setForm({ ...form, province: "", ward: "", detail: "" });
        setWards([]);
      })
      .catch((err) => console.error(err.response?.data || err.message));
  };

  // Xử lý xóa địa chỉ
  const handleDeleteAddress = (index) => {
    const token = localStorage.getItem("token");
    const updatedAddresses = (user.addresses || []).filter((_, i) => i !== index);

    axios
      .put(
        "http://localhost:5000/auth/update",
        { addresses: updatedAddresses },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      )
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error(err.response?.data || err.message));
  };

  // Xử lý đổi mật khẩu
  const handleChangePassword = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .put(
        "http://localhost:5000/auth/change-password",
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      )
      .then((res) => {
        alert("Đổi mật khẩu thành công!");
        setForm({ ...form, currentPassword: "", newPassword: "" });
      })
      .catch((err) => {
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
            <h3 className="username">{user.name}</h3>
          </div>
          <div className="menu">
            <p className="menu-title">Tài Khoản Của Tôi</p>
            <ul>
              <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
                Hồ Sơ
              </li>
              <li className={activeTab === "address" ? "active" : ""} onClick={() => setActiveTab("address")}>
                Địa Chỉ
              </li>
              <li className={activeTab === "password" ? "active" : ""} onClick={() => setActiveTab("password")}>
                Đổi Mật Khẩu
              </li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="profile-main">
          {activeTab === "profile" && (
            <form
              className="profile-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveProfile();
              }}
            >
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
              <button className="btn-save" type="submit">
                Lưu
              </button>
            </form>
          )}

          {activeTab === "address" && (
            <>
              <ul>
                {user.addresses?.map((addr, index) => (
                  <li key={addr._id || index} className="address-item">
                    <div className="address__item-info">
                      <span>{addr.detail}, {addr.ward}, {addr.province}</span>
                    </div>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteAddress(index)}
                    >
                      Xóa
                    </button>
                  </li>
                ))}
              </ul>
              <div className="form-group">
                <label>Tỉnh/Thành phố</label>
                <select name="province" className="changeAdress" value={form.province} onChange={handleProvinceChange}>
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Phường/Xã (trực thuộc tỉnh)</label>
                <select name="ward" className="changeAdress" value={form.ward} onChange={handleChange} disabled={!form.province}>
                  <option value="">Chọn Phường/Xã</option>
                  {wards.map((ward) => (
                    <option key={ward.code} value={ward.name}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Số nhà, đường</label>
                <input
                  type="text"
                  name="detail"
                  placeholder="Số nhà, đường"
                  value={form.detail}
                  onChange={handleChange}
                />
              </div>
              <button className="btn-save" onClick={handleAddAddress}>
                Thêm
              </button>
            </>
          )}

          {activeTab === "password" && (
            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label>Mật khẩu hiện tại</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={form.currentPassword || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu mới</label>
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword || ""}
                  onChange={handleChange}
                />
              </div>
              <button className="btn-save" type="submit">
                Đổi mật khẩu
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;