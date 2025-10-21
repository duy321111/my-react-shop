// src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const Home = () => {
  const [promoProducts, setPromoProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  
  useEffect(() => {
   
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        const allProducts = res.data;
        setPromoProducts(allProducts.filter((p) => p.saleOff > 0));
        setNewProducts(allProducts.slice(-30).reverse()); 
      })
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="app__container">
        <div className="grid">
          <ProductList title="Sản phẩm khuyến mãi" products={promoProducts} />
          <Banner />
          <ProductList title="Sản phẩm mới" products={newProducts} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
