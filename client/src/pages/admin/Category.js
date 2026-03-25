import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../assets/css/admin/category.module.css";
import AdminSidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/HeaderAdmin";
import { notificationService } from "../../services/notificationService";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        brands: [],
        parentCategory: "",
    });

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/categories");
            setCategories(res.data);
        } catch (err) {
            console.error("Lỗi khi tải danh sách category:", err);
        }
    };

    const fetchBrands = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/brand");
            setBrands(res.data);
        } catch (err) {
            console.error("Lỗi khi tải danh sách brand:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xoá category này?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`);
            setCategories(categories.filter((c) => c._id !== id));
        } catch (err) {
            console.error("Lỗi khi xoá category:", err);
        }
    };

    const openEditModal = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            image: category.image || "",
            description: category.description || "",
            brands: category.brands?.map((b) => b._id) || [],
            parentCategory: category.parentCategory || "",
        });
    };

    const closeEditModal = () => {
        setEditingCategory(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBrandSelect = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(
            (option) => option.value,
        );
        setFormData({
            ...formData,
            brands: [...new Set([...formData.brands, ...selectedOptions])],
        });
    };

    const removeBrand = (brandId) => {
        setFormData({
            ...formData,
            brands: formData.brands.filter((id) => id !== brandId),
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:5000/api/categories/update/${editingCategory._id}`,
                formData,
            );
            notificationService.success("Cập nhật category thành công!");
            closeEditModal();
            fetchCategories();
        } catch (err) {
            console.error("Lỗi khi cập nhật category:", err);
            notificationService.error("Có lỗi xảy ra khi cập nhật!");
        }
    };

    const getBrandName = (id) => {
        const b = brands.find((brand) => brand._id === id);
        return b ? b.name : "Không xác định";
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
                        <h1 className={styles.title}>Danh sách Category</h1>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên Category</th>
                                    <th>Image</th>
                                    <th>Mô tả</th>
                                    <th>Brands</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category._id}>
                                        <td>{index + 1}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            {category.image ? (
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className={styles.logo}
                                                />
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td>{category.description || "—"}</td>
                                        <td>
                                            {category.brands &&
                                            category.brands.length > 0
                                                ? category.brands
                                                      .map((b) => b.name)
                                                      .join(", ")
                                                : "—"}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    openEditModal(category)
                                                }
                                                className={styles.editBtn}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(category._id)
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

                        {/* MODAL SỬA CATEGORY */}
                        {editingCategory && (
                            <div
                                className={styles.modalOverlay}
                                onClick={closeEditModal}
                            >
                                <div
                                    className={styles.modalContent}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <h2 className={styles.modalTitle}>
                                        Sửa Category
                                    </h2>
                                    <form
                                        onSubmit={handleUpdate}
                                        className={styles.form}
                                    >
                                        <label>Tên Category</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />

                                        <label>Image (URL)</label>
                                        <input
                                            type="text"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                        />
                                        {formData.image && (
                                            <img
                                                src={formData.image}
                                                alt="Image preview"
                                                className={styles.logoPreview}
                                            />
                                        )}

                                        <label>Mô tả</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        ></textarea>

                                        <label>Brands hiện tại</label>
                                        <div className={styles.selectedBrands}>
                                            {formData.brands.length > 0 ? (
                                                formData.brands.map((id) => (
                                                    <span
                                                        key={id}
                                                        className={
                                                            styles.brandTag
                                                        }
                                                    >
                                                        {getBrandName(id)}
                                                        <button
                                                            type="button"
                                                            className={
                                                                styles.removeBtn
                                                            }
                                                            onClick={() =>
                                                                removeBrand(id)
                                                            }
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))
                                            ) : (
                                                <p className={styles.noBrand}>
                                                    Chưa có brand nào
                                                </p>
                                            )}
                                        </div>

                                        <label>Thêm brands</label>
                                        <select
                                            multiple
                                            onChange={handleBrandSelect}
                                            className={styles.brandSelect}
                                        >
                                            {brands.map((b) => (
                                                <option
                                                    key={b._id}
                                                    value={b._id}
                                                >
                                                    {b.name}
                                                </option>
                                            ))}
                                        </select>

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
