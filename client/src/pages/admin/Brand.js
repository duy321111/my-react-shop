import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../assets/css/admin/brand.module.css";
import AdminSidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/HeaderAdmin";
import { notificationService } from "../../services/notificationService";
import API_URL from "../../config";

export default function BrandList() {
    const [brands, setBrands] = useState([]);
    const [editingBrand, setEditingBrand] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        logo: "",
        description: "",
    });

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/brand`);
            setBrands(res.data);
        } catch (err) {
            console.error("Lỗi khi tải danh sách thương hiệu:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xoá thương hiệu này?")) return;
        try {
            await axios.delete(`${API_URL}/api/brand/${id}`);
            setBrands(brands.filter((b) => b._id !== id));
        } catch (err) {
            console.error("Lỗi khi xoá thương hiệu:", err);
        }
    };

    const openEditModal = (brand) => {
        setEditingBrand(brand);
        setFormData({
            name: brand.name,
            logo: brand.logo || "",
            description: brand.description || "",
        });
    };

    const closeEditModal = () => {
        setEditingBrand(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${API_URL}/api/brand/update/${editingBrand._id}`,
                formData,
            );
            notificationService.success("Cập nhật thương hiệu thành công!");
            closeEditModal();
            fetchBrands();
        } catch (err) {
            console.error("Lỗi khi cập nhật thương hiệu:", err);
            notificationService.error("Có lỗi xảy ra khi cập nhật!");
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
                        <h1 className={styles.title}>Danh sách thương hiệu</h1>

                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên thương hiệu</th>
                                    <th>Logo</th>
                                    <th>Mô tả</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brands.map((brand, index) => (
                                    <tr key={brand._id}>
                                        <td>{index + 1}</td>
                                        <td>{brand.name}</td>
                                        <td>
                                            {brand.logo ? (
                                                <img
                                                    src={brand.logo}
                                                    alt={brand.name}
                                                    className={styles.logo}
                                                />
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td>{brand.description || "—"}</td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    openEditModal(brand)
                                                }
                                                className={styles.editBtn}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(brand._id)
                                                }
                                                className={styles.deleteBtn}
                                            >
                                                Xoá
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* MODAL SỬA THƯƠNG HIỆU */}
                        {editingBrand && (
                            <div
                                className={styles.modalOverlay}
                                onClick={closeEditModal}
                            >
                                <div
                                    className={styles.modalContent}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <h2 className={styles.modalTitle}>
                                        Sửa thương hiệu
                                    </h2>
                                    <form
                                        onSubmit={handleUpdate}
                                        className={styles.form}
                                    >
                                        <label>Tên thương hiệu</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />

                                        <label>Logo (URL)</label>
                                        <input
                                            type="text"
                                            name="logo"
                                            value={formData.logo}
                                            onChange={handleChange}
                                        />
                                        {formData.logo && (
                                            <img
                                                src={formData.logo}
                                                alt="Logo preview"
                                                className={styles.logoPreview}
                                            />
                                        )}

                                        <label>Mô tả</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        ></textarea>

                                        <div className={styles.modalActions}>
                                            <button
                                                type="submit"
                                                className={styles.saveBtn}
                                            >
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
