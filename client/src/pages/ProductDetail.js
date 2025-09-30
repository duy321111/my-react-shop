// src/pages/ProductDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import QuantitySelector from "../components/QuantitySelector";
import Tabs from "../components/Tab/Tab";

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        

        setMainImage(`${process.env.PUBLIC_URL}/img/${data.image}`);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Đang tải sản phẩm...</p>;
  }

  return (
    <div className="app__container">
      <Header />
      <div className="grid">
        <div className="grid__row product-detail">
          {/* Cột ảnh sản phẩm */}
          <div className="grid__column-6">
            <div className="grid__row product-img">
              <img
                src={mainImage}
                alt={product.name}
                className="product-detail__img"
              />
            </div>

            <div className="grid__row img-preview">
              <img
                  src={`${process.env.PUBLIC_URL}/img/${product.image}`}
                  className="product-preview__img"
                  onClick={() =>
                    setMainImage(`${process.env.PUBLIC_URL}/img/${product.image}`)
                  }
                />
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={`${process.env.PUBLIC_URL}/img/${img}`}
                  className="product-preview__img"
                  onClick={() =>
                    setMainImage(`${process.env.PUBLIC_URL}/img/${img}`)
                  }
                />
              ))}
            </div>
          </div>

          {/* Cột thông tin sản phẩm */}
          <div className="grid__column-6">
            <div className="product-info">
              <h1>{product.name}</h1>
              <div className="price">
                <p className="price-current">
                  {product.priceCurrent?.toLocaleString()}₫
                </p>
                {product.priceOld && (
                  <p className="price-old">
                    {product.priceOld.toLocaleString()}₫
                  </p>
                )}
              </div>

              <div className="brand-origin">
                {product.brand && (
                  <p>
                    Thương hiệu:{" "}
                    {typeof product.brand === "string"
                      ? product.brand
                      : product.brand.name}
                  </p>
                )}
                {product.origin && (
                  <p>
                    Xuất xứ:{" "}
                    {typeof product.origin === "string"
                      ? product.origin
                      : product.origin.name}
                  </p>
                )}
              </div>
            </div>

            {product.promotions && product.promotions.length > 0 && (
              <div className="product-promo">
                <h3>Khuyến mãi:</h3>
                <ul>
                  {product.promotions.map((promo, index) => (
                    <li key={index}>
                      {typeof promo === "string"
                        ? promo
                        : promo.name || JSON.stringify(promo)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="qnt-selector">
              <p>Chọn số lượng:</p>
              <QuantitySelector />
            </div>

            <div className="buy-btn">
              <button className="buy-now">Mua ngay</button>
              <br />
              <button className="add-to-cart">Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>

        <div className="grid__row tabs">
          <Tabs productId={product._id} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
