import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/HeaderAdmin";
import styles from "../../assets/css/admin/addcategory.module.css";
import { notificationService } from "../../services/notificationService";

// Component chọn nhiều brand kiểu tag/chip
const BrandSelector = ({ brands, selectedBrands, setSelectedBrands }) => {
    const handleSelect = (e) => {
        const brandId = e.target.value;
        if (!selectedBrands.includes(brandId)) {
            setSelectedBrands([...selectedBrands, brandId]);
        }
    };

    const handleRemove = (brandId) => {
        setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
    };

    return (
        <div>
            <select onChange={handleSelect} value="">
                <option value="" disabled>
                    Chọn brand
                </option>
                {brands
                    .filter((b) => !selectedBrands.includes(b._id))
                    .map((b) => (
                        <option key={b._id} value={b._id}>
                            {b.name}
                        </option>
                    ))}
            </select>

            <div className={styles.chipContainer}>
                {selectedBrands.map((id) => {
                    const brand = brands.find((b) => b._id === id);
                    return (
                        <div key={id} className={styles.chip}>
                            {brand?.name}
                            <span
                                className={styles.removeChip}
                                onClick={() => handleRemove(id)}
                            >
                                ×
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const AddCategory = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchBrands();
        fetchCategories();
    }, []);

    const fetchBrands = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/brand");
            setBrands(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/categories");
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            notificationService.warning("Tên danh mục không được để trống");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/categories", {
                name,
                description,
                image,
                brands: selectedBrands,
            });
            notificationService.success("Thêm danh mục thành công!");
            setName("");
            setDescription("");
            setImage("");
            setSelectedBrands([]);
            fetchCategories();
        } catch (err) {
            console.error(err);
            notificationService.error(
                err.response?.data?.message || "Lỗi khi thêm danh mục",
            );
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
                        <h1 className={styles.title}>Thêm Danh Mục Mới</h1>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Tên danh mục"
                                required
                            />

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Mô tả danh mục"
                            ></textarea>

                            <label className="label-brand">Chọn Brands</label>
                            <BrandSelector
                                brands={brands}
                                selectedBrands={selectedBrands}
                                setSelectedBrands={setSelectedBrands}
                            />

                            <button type="submit" className={styles.addBtn}>
                                Thêm Danh Mục
                            </button>
                        </form>

                        <h2>Danh sách danh mục</h2>
                        <div className={styles.categoryList}>
                            {categories.map((c) => (
                                <div
                                    key={c._id}
                                    className={styles.categoryItem}
                                >
                                    <strong>{c.name}</strong>
                                    {c.brands && c.brands.length > 0 && (
                                        <p>
                                            Brands:{" "}
                                            {c.brands
                                                .map((b) => b.name)
                                                .join(", ")}
                                        </p>
                                    )}
                                    {c.description && <p>{c.description}</p>}
                                    {c.image && (
                                        <img
                                            src={c.image}
                                            alt={c.name}
                                            className={styles.categoryImg}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
