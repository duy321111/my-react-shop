import React, { useEffect, useState } from "react";
import axios from "axios";

const Category = ({ categoryName, onSelectBrand }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBrand, setActiveBrand] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/categories/${encodeURIComponent(categoryName)}/brands`
        );
        setBrands(res.data);
        if (res.data.length > 0) setActiveBrand(res.data[0]._id); // default chọn brand đầu tiên
        if (onSelectBrand) onSelectBrand(res.data[0]?._id);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [categoryName, onSelectBrand]);

  const handleClick = (brandId) => {
    setActiveBrand(brandId);
    if (onSelectBrand) onSelectBrand(brandId); // gọi callback để filter product
  };

  if (loading) return <div>Loading brands...</div>;

  return (
    <nav className="category">
      <h3 className="category__heading">
        <i className="category__heading-icon fa-solid fa-list"></i>
        Thương hiệu
      </h3>

      <ul className="category-list">
        {brands.map((brand) => (
          <li
            key={brand._id}
            className={`category-item ${
              activeBrand === brand._id ? "category-item--active" : ""
            }`}
          >
            <a
              href="#"
              className="category-item__link"
              onClick={(e) => {
                e.preventDefault();
                handleClick(brand._id);
              }}
            >
              {brand.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Category;
