import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../assets/css/admin/admin.module.css";
import AdminSidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/HeaderAdmin";
import { notificationService } from "../../services/notificationService";

export default function AdminList() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);

    // modal / form states
    const [editingAdmin, setEditingAdmin] = useState(null); // admin object when edit
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "staff",
    });

    // search
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const adminToken = localStorage.getItem("adminToken");
            const res = await axios.get("http://localhost:5000/api/admin", {
                headers: adminToken
                    ? { Authorization: `Bearer ${adminToken}` }
                    : undefined,
            });
            setAdmins(res.data);
        } catch (err) {
            console.error("Lỗi khi tải danh sách admin:", err);
            notificationService.error("Không thể tải danh sách admin.");
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (admin) => {
        setEditingAdmin(admin);
        setFormData({
            name: admin.name || "",
            email: admin.email || "",
            password: "", // để trống nghĩa là không đổi
            role: admin.role || "staff",
        });
    };

    const closeEditModal = () => {
        setEditingAdmin(null);
        setFormData({ name: "", email: "", password: "", role: "staff" });
    };

    const openAddModal = () => {
        setShowAddModal(true);
        setFormData({ name: "", email: "", password: "", role: "staff" });
    };

    const closeAddModal = () => {
        setShowAddModal(false);
        setFormData({ name: "", email: "", password: "", role: "staff" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            notificationService.warning(
                "Vui lòng điền tên, email và password.",
            );
            return;
        }
        try {
            const adminToken = localStorage.getItem("adminToken");
            await axios.post("http://localhost:5000/api/admin", formData, {
                headers: adminToken
                    ? { Authorization: `Bearer ${adminToken}` }
                    : undefined,
            });
            notificationService.success("Tạo tài khoản nhân viên thành công!");
            closeAddModal();
            fetchAdmins();
        } catch (err) {
            console.error("Lỗi khi tạo admin:", err);
            notificationService.error(
                err.response?.data?.message || "Có lỗi khi tạo admin.",
            );
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingAdmin) return;
        try {
            const adminToken = localStorage.getItem("adminToken");
            // gửi cả password (nếu rỗng backend nên giữ password cũ)
            await axios.put(
                `http://localhost:5000/api/admin/update/${editingAdmin._id}`,
                formData,
                {
                    headers: adminToken
                        ? { Authorization: `Bearer ${adminToken}` }
                        : undefined,
                },
            );
            notificationService.success("Cập nhật thành công!");
            closeEditModal();
            fetchAdmins();
        } catch (err) {
            console.error("Lỗi khi cập nhật admin:", err);
            notificationService.error(
                err.response?.data?.message || "Có lỗi khi cập nhật admin.",
            );
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xoá nhân viên này?")) return;
        try {
            const adminToken = localStorage.getItem("adminToken");
            await axios.delete(`http://localhost:5000/api/admin/${id}`, {
                headers: adminToken
                    ? { Authorization: `Bearer ${adminToken}` }
                    : undefined,
            });
            setAdmins((prev) => prev.filter((a) => a._id !== id));
            notificationService.success("Xoá thành công!");
        } catch (err) {
            console.error("Lỗi khi xoá admin:", err);
            notificationService.error("Có lỗi khi xoá admin.");
        }
    };

    // filter search by name or email
    const filtered = admins.filter((a) => {
        const t = searchTerm.toLowerCase();
        return (
            a.name?.toLowerCase().includes(t) ||
            a.email?.toLowerCase().includes(t) ||
            a.role?.toLowerCase().includes(t)
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
                        <h1 className={styles.title}>
                            Quản lý nhân viên nội bộ
                        </h1>

                        <div className={styles.topActions}>
                            <div className={styles.searchBox}>
                                <input
                                    type="text"
                                    placeholder="Tìm theo tên, email hoặc role..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className={styles.searchInput}
                                />
                            </div>

                            <div>
                                <button
                                    className={styles.addBtn}
                                    onClick={openAddModal}
                                >
                                    Thêm nhân viên
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <p>Đang tải...</p>
                        ) : (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                style={{ textAlign: "center" }}
                                            >
                                                Không tìm thấy nhân viên.
                                            </td>
                                        </tr>
                                    ) : (
                                        filtered.map((adm, idx) => (
                                            <tr key={adm._id}>
                                                <td>{idx + 1}</td>
                                                <td>{adm.name || "—"}</td>
                                                <td>{adm.email || "—"}</td>
                                                <td>{adm.role || "staff"}</td>
                                                <td>
                                                    <button
                                                        className={
                                                            styles.editBtn
                                                        }
                                                        onClick={() =>
                                                            openEditModal(adm)
                                                        }
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button
                                                        className={
                                                            styles.deleteBtn
                                                        }
                                                        onClick={() =>
                                                            handleDelete(
                                                                adm._id,
                                                            )
                                                        }
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
                    </div>

                    {/* Modal Add */}
                    {showAddModal && (
                        <div
                            className={styles.modalOverlay}
                            onClick={closeAddModal}
                        >
                            <div
                                className={styles.modalContent}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className={styles.modalTitle}>
                                    Thêm nhân viên
                                </h2>

                                <form
                                    className={styles.form}
                                    onSubmit={handleCreate}
                                >
                                    <label>Tên</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                    <label>Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                    <label>Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                    <label>Role</label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="admin">admin</option>
                                        <option value="staff">staff</option>
                                    </select>

                                    <div className={styles.modalActions}>
                                        <button
                                            type="submit"
                                            className={styles.saveBtn}
                                        >
                                            Tạo
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.cancelBtn}
                                            onClick={closeAddModal}
                                        >
                                            Huỷ
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Modal Edit */}
                    {editingAdmin && (
                        <div
                            className={styles.modalOverlay}
                            onClick={closeEditModal}
                        >
                            <div
                                className={styles.modalContent}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className={styles.modalTitle}>
                                    Sửa nhân viên
                                </h2>

                                <form
                                    className={styles.form}
                                    onSubmit={handleUpdate}
                                >
                                    <label>Tên</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                    <label>Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                    <label>
                                        Mật khẩu (để trống nếu không đổi)
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="•••••• (để trống nếu không đổi)"
                                    />

                                    <label>Role</label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="admin">admin</option>
                                        <option value="staff">staff</option>
                                    </select>

                                    <div className={styles.modalActions}>
                                        <button
                                            type="submit"
                                            className={styles.saveBtn}
                                        >
                                            Lưu
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.cancelBtn}
                                            onClick={closeEditModal}
                                        >
                                            Huỷ
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
