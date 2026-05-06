import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/HeaderAdmin";
import styles from "../../assets/css/admin/addbrand.module.css";
import { notificationService } from "../../services/notificationService";
import API_URL from "../../config";

const AddBrand = () => {
    const [name, setName] = useState("");
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/brand`);
            setBrands(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            notificationService.warning("Tên thương hiệu không được để trống");
            return;
        }

        try {
            await axios.post(`${API_URL}/api/brand/add`, { name });
            notificationService.success("Thêm thương hiệu thành công!");
            setName("");
            fetchBrands();
        } catch (err) {
            console.error(err);
            notificationService.error(
                err.response?.data?.message || "Lỗi khi thêm thương hiệu",
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
                        <h1 className={styles.title}>Thêm Thương Hiệu Mới</h1>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputRow}>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nhập tên thương hiệu"
                                    required
                                />
                                <button type="submit" className={styles.addBtn}>
                                    Thêm
                                </button>
                            </div>
                        </form>

                        <h2>Danh sách thương hiệu</h2>
                        <div className={styles.brandList}>
                            {brands.map((b) => (
                                <div key={b._id} className={styles.brandItem}>
                                    {b.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBrand;
