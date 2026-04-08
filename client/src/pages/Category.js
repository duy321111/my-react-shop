import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import Filter from "../components/Filter";
import Category from "../components/Category";
import LoadingState from "../components/LoadingState";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/api/products?category=${encodeURIComponent(categoryName)}`;
        if (selectedBrand && selectedBrand !== "all") {
          url += `&brand=${encodeURIComponent(selectedBrand)}`;
        }
        if (sort) {
          url += `&sort=${encodeURIComponent(sort)}`;
        }
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error("Lỗi khi load sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) fetchProducts();
  }, [categoryName, selectedBrand, sort]);

  return (
    <div className="app">
      <Header />
      <div className="app__container">
        <div className="grid">
          <div className="grid__row app__content">
            <div className="category_row">
              <div className="grid__column-2">
                <Category
                  categoryName={categoryName}
                  onSelectBrand={(brandId) => setSelectedBrand(brandId)}
                />
              </div>
              
              <div className="grid__column-10">
                <Filter onSortChange={(value) => setSort(value)} />
                {loading ? (
                  <LoadingState label="Đang tải sản phẩm..." compact />
                ) : (
                  <ProductList products={products} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
