import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingState from "./LoadingState";
import API_URL from "../config";

const Category = ({ categoryName, onSelectBrand }) => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeBrand, setActiveBrand] = useState("all");

    useEffect(() => {
        const fetchBrands = async () => {
            setLoading(true);
            try {
                const url = categoryName
                    ? `${API_URL}/api/categories/${encodeURIComponent(categoryName)}/brands`
                    : `${API_URL}/api/brands`;
                const res = await axios.get(url);
                setBrands(res.data);
            } catch (err) {
                console.error("Lỗi khi tải brand:", err);
            } finally {
                setLoading(false);
            }
        };

        setActiveBrand("all");
        if (onSelectBrand) onSelectBrand("all");
        fetchBrands();
    }, [categoryName]); // chỉ chạy khi category đổi

    const handleClick = (brandId) => {
        setActiveBrand(brandId);
        if (onSelectBrand) onSelectBrand(brandId);
    };

    if (loading)
        return <LoadingState label="Đang tải thương hiệu..." compact />;

    return (
        <nav className="category">
            <h3 className="category__heading">
                <i className="category__heading-icon fa-solid fa-list"></i>
                Thương hiệu
            </h3>

            <ul className="category-list">
                <li
                    className={`category-item ${
                        activeBrand === "all" ? "category-item--active" : ""
                    }`}
                >
                    <button
                        type="button"
                        className="category-item__link"
                        onClick={() => handleClick("all")}
                    >
                        Tất cả
                    </button>
                </li>

                {brands.map((brand) => (
                    <li
                        key={brand._id}
                        className={`category-item ${
                            activeBrand === brand._id
                                ? "category-item--active"
                                : ""
                        }`}
                    >
                        <button
                            type="button"
                            className="category-item__link"
                            onClick={() => handleClick(brand._id)}
                        >
                            {brand.name}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Category;
