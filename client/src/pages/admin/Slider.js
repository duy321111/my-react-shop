import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/HeaderAdmin";
import styles from "../../assets/css/admin/slider.module.css";

export default function SliderAdmin() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    image: "", 
    description: "",
    status: true,
    title: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/slider");
      setSliders(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy slider:", err);
      alert("Không thể tải danh sách slider.");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditing(null);
    setForm({ image: "", description: "", status: true, title: "" });
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  const openEditModal = (s) => {
    setEditing(s);
    setForm({
      image: s.image || "",
      description: s.description || "",
      status: typeof s.status === "boolean" ? s.status : true,
      title: s.title || "",
    });
    setSelectedFile(null);
    setPreviewUrl(getImageUrl(s.image));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (previewUrl && selectedFile) URL.revokeObjectURL(previewUrl);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

    const getImageUrl = (img) => {
    if (!img) return null;


    if (img.startsWith("http://") || img.startsWith("https://")) return img;

    // Nếu là đường dẫn local từ backend, prepend localhost:5000
    return `http://localhost:5000/${img.replace(/^\/+/, "")}`;
    };

  const handleSave = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (selectedFile) fd.append("image", selectedFile);
    fd.append("title", form.title ?? "");
    fd.append("description", form.description ?? "");
    fd.append("status", form.status ? "true" : "false");

    try {
      if (editing) {
        await axios.put(`http://localhost:5000/api/slider/${editing._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Cập nhật slider thành công");
      } else {
        if (!selectedFile && !window.confirm("Bạn chưa chọn file ảnh. Tiếp tục không?")) return;
        await axios.post("http://localhost:5000/api/slider", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Thêm slider thành công");
      }
      closeModal();
      fetchSliders();
    } catch (err) {
      console.error("Lỗi lưu slider:", err);
      const msg = err?.response?.data?.message || err.message;
      alert("Có lỗi xảy ra khi lưu slider: " + msg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa slider này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/slider/${id}`);
      setSliders((prev) => prev.filter((s) => s._id !== id));
      alert("Xóa thành công");
    } catch (err) {
      console.error("Lỗi xóa slider:", err);
      alert("Có lỗi khi xóa slider.");
    }
  };

  const toggleStatus = async (s) => {
    try {
      const fd = new FormData();
      fd.append("status", (!s.status).toString());
      fd.append("title", s.title || "");
      fd.append("description", s.description || "");
      await axios.put(`http://localhost:5000/api/slider/${s._id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSliders((prev) => prev.map((item) => (item._id === s._id ? { ...item, status: !item.status } : item)));
    } catch (err) {
      console.error("Lỗi đổi trạng thái:", err);
      alert("Không thể đổi trạng thái.");
    }
  };

  return (
    <div className="grid-full-width">
      <div className="grid__row">
        <div className="grid__column-2">
          <AdminSidebar />
        </div>

        <div className="grid__column-10">
          <AdminHeader />
          <div className={styles.wrapper}>
            <div className={styles.headerRow}>
              <h1 className={styles.title}>Quản lý Slider</h1>
              <div>
                <button className={styles.addBtn} onClick={openAddModal}>Thêm Slider</button>
              </div>
            </div>

            {loading ? (
              <p className={styles.loading}>Đang tải...</p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Ảnh</th>
                    <th>Tiêu đề</th>
                    <th>Mô tả</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {sliders.length === 0 && (
                    <tr><td colSpan="6" className={styles.center}>Chưa có slider</td></tr>
                  )}
                  {sliders.map((s, idx) => (
                    <tr key={s._id}>
                      <td>{idx + 1}</td>
                      <td>
                        {s.image ? (
                          <img src={getImageUrl(s.image)} alt={s.title || `slider-${idx}`} className={styles.thumb} />
                        ) : "—"}   
                      </td>
                      <td>{s.title || "—"}</td>
                      <td className={styles.description}>{s.description || "—"}</td>
                      <td>
                        <button
                          className={s.status ? styles.statusOn : styles.statusOff}
                          onClick={() => toggleStatus(s)}
                        >
                          {s.status ? "Bật" : "Tắt"}
                        </button>
                      </td>
                      <td>
                        <button className={styles.editBtn} onClick={() => openEditModal(s)}>Sửa</button>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(s._id)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {isModalOpen && (
              <div className={styles.modalOverlay} onClick={closeModal}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                  <h2 className={styles.modalTitle}>{editing ? "Sửa Slider" : "Thêm Slider"}</h2>

                  <form onSubmit={handleSave} className={styles.form}>
                    <label className={styles.label}>Tiêu đề (tùy chọn)</label>
                    <input name="title" value={form.title} onChange={handleChange} className={styles.input} />

                    <label className={styles.label}>Ảnh (chọn file) <span className={styles.hint}>{editing ? "(bỏ trống để giữ ảnh cũ)" : "(bắt buộc)"}</span></label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className={styles.inputFile} />

                    {previewUrl && (
                      <div className={styles.previewWrapper}>
                        <img src={previewUrl} alt="preview" className={styles.preview} />
                      </div>
                    )}

                    <label className={styles.label}>Mô tả</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={styles.textarea} />

                    <label className={styles.checkboxLabel}>
                        <span>Kích hoạt (Bật)</span>
                      <input type="checkbox" name="status" checked={form.status} onChange={handleChange} />
                    
                    </label>

                    <div className={styles.modalActions}>
                      <button type="submit" className={styles.saveBtn}>Lưu</button>
                      <button type="button" className={styles.cancelBtn} onClick={closeModal}>Hủy</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
