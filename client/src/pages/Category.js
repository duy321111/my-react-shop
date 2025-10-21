import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import Filter from "../components/Filter";
import Pagnination from "../components/Pagnination";
import Category from "../components/Category";

const CategoryPage = () => {
  const { categoryName } = useParams(); // lấy từ URL /category/:categoryName
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("all"); 
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 10;
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        //  Tạo URL động dựa vào brand
        let url = `http://localhost:5000/api/products?category=${encodeURIComponent(categoryName)}`;

        if (selectedBrand && selectedBrand !== "all") {
          url += `&brand=${encodeURIComponent(selectedBrand)}`;
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
  }, [categoryName, selectedBrand]); 



  return (
    <div className="app">
      <Header />
      <div className="app__container">
        <div className="grid">
          <div className="grid__row app__content">
            <div className="grid__column-2">
              <Category
                categoryName={categoryName}
                onSelectBrand={(brandId) => setSelectedBrand(brandId)}
              />
            </div>

            <div className="grid__column-10">
              <Filter />
              <ProductList products={products} />

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
