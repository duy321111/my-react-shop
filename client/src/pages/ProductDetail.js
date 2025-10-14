import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import QuantitySelector from "../components/QuantitySelector";
import Tabs from "../components/Tab/Tab";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1); // số lượng chọn

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

  if (!product) return <p>Đang tải sản phẩm...</p>;

  //  Hàm thêm vào giỏ hàng
  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?._id) {
        alert("Bạn cần đăng nhập trước khi thêm vào giỏ hàng!");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/cart/add", {
        userId: user._id,
        productId: product._id,
        name: product.name,
        price: product.priceCurrent,
        image: product.image,
        quantity
      });
      window.dispatchEvent(new Event("cartUpdated"));
   
      console.log("Giỏ hàng sau khi thêm:", res.data);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Không thể thêm vào giỏ hàng!");
    }
  };


  return (
    <div className="app__container">
      <Header />
      <div className="grid">
        <div className="grid__row product-detail">
          {/* Cột ảnh */}
          <div className="grid__column-6">
            <div className="grid__row product-img">
              <img src={mainImage} alt={product.name} className="product-detail__img" />
            </div>
            <div className="grid__row img-preview">
              <img
                src={`${process.env.PUBLIC_URL}/img/${product.image}`}
                className="product-preview__img"
                onClick={() => setMainImage(`${process.env.PUBLIC_URL}/img/${product.image}`)}
              />
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={`${process.env.PUBLIC_URL}/img/${img}`}
                  className="product-preview__img"
                  onClick={() => setMainImage(`${process.env.PUBLIC_URL}/img/${img}`)}
                />
              ))}
            </div>
          </div>

          {/* Cột thông tin */}
          <div className="grid__column-6">
            <div className="product-info">
              <h1>{product.name}</h1>
              <div className="price">
                <p className="price-current">
                  {product.priceCurrent?.toLocaleString()}₫
                </p>
                {product.priceOld && (
                  <p className="price-old">{product.priceOld.toLocaleString()}₫</p>
                )}
              </div>

              <div className="brand-origin">
                {product.brand && <p>Thương hiệu: {product.brand.name || product.brand}</p>}
                {product.origin && <p>Xuất xứ: {product.origin}</p>}
              </div>
            </div>

            {product.promotions?.length > 0 && (
              <div className="product-promo">
                <h3>Khuyến mãi:</h3>
                <ul>
                  {product.promotions.map((promo, index) => (
                    <li key={index}>{promo}</li>
                  ))}
                </ul>
              </div>
            )}

            {/*  Chọn số lượng */}
            <div className="qnt-selector">
              <p>Chọn số lượng:</p>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            <div className="buy-btn">
              <button className="buy-now">Mua ngay</button>
              <br />
              <button className="add-to-cart" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </button>
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
