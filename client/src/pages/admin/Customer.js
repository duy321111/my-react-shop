import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../assets/css/admin/customer.module.css";
import AdminSidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/HeaderAdmin";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: ""
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/user");
      setCustomers(res.data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách khách hàng:", err);
      alert("Không thể tải danh sách khách hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá khách hàng này?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
      alert("Xoá thành công!");
    } catch (err) {
      console.error("Lỗi khi xoá khách hàng:", err);
      alert("Có lỗi xảy ra khi xoá khách hàng.");
    }
  };

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      avatar: customer.avatar || ""
    });
  };

  const closeEditModal = () => {
    setEditingCustomer(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingCustomer) return;

    try {
      await axios.put(
        `http://localhost:5000/api/user/update/${editingCustomer._id}`,
        formData
      );
      alert("Cập nhật khách hàng thành công!");
      closeEditModal();
      fetchCustomers();
    } catch (err) {
      console.error("Lỗi khi cập nhật khách hàng:", err);
      alert("Có lỗi xảy ra khi cập nhật khách hàng.");
    }
  };

  // --- FILTER TÌM KIẾM ---
  const filteredCustomers = customers.filter((cust) => {
    const term = searchTerm.toLowerCase();
    return (
      cust.name?.toLowerCase().includes(term) ||
      cust.email?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="grid-full-width">
      <div className="grid__row">
        <div className="grid__column-2">
          <AdminSidebar />
        </div>

        <div className="grid__column-10">
          <AdminHeader />

          <div className={styles.wrapper}>
            <h1 className={styles.title}>Danh sách khách hàng</h1>

            {/* Ô tìm kiếm */}
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Tìm theo tên hoặc email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            {loading ? (
              <p>Đang tải...</p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Avatar</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Điện thoại</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center" }}>
                        Không tìm thấy khách hàng.
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((cust, index) => (
                      <tr key={cust._id}>
                        <td>{index + 1}</td>
                        <td>
                          {cust.avatar ? (
                            <img
                              src={`http://localhost:5000${cust.avatar}`}
                              alt={cust.name}
                              className={styles.avatar}
                            />
                          ) : (
                            "—"
                          )}
                        </td>
                        <td>{cust.name || "—"}</td>
                        <td>{cust.email || "—"}</td>
                        <td>{cust.phone || "—"}</td>
                        <td>
                          <button
                            onClick={() => openEditModal(cust)}
                            className={styles.editBtn}
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(cust._id)}
                            className={styles.deleteBtn}
                          >
                            Xoá
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* Modal Sửa */}
            {editingCustomer && (
              <div className={styles.modalOverlay} onClick={closeEditModal}>
                <div
                  className={styles.modalContent}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className={styles.modalTitle}>Sửa khách hàng</h2>

                  <form onSubmit={handleUpdate} className={styles.form}>
                    <label>Tên</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                    <label>Điện thoại</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                    <div className={styles.modalActions}>
                      <button type="submit" className={styles.saveBtn}>
                        Lưu thay đổi
                      </button>
                      <button
                        type="button"
                        className={styles.cancelBtn}
                        onClick={closeEditModal}
                      >
                        Hủy
                      </button>
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
