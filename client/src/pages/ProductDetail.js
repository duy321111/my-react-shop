import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import QuantitySelector from "../components/QuantitySelector";
import Tabs from "../components/Tab/Tab";
const ProductDetail = () => {
  // Danh sách ảnh giả định (sau này lấy từ API)
  const thumbs = [
    "img/lap.png",
    "img/dongho.webp",
    "img/lap.png",
  ];

  // State cho ảnh chính
  const [mainImage, setMainImage] = useState(thumbs[0]);

  return (
    <div className="app__container">
      <Header />
      <div className="grid">
        <div className="grid__row product-detail">
          {/* Cột ảnh sản phẩm */}
          <div className="grid__column-6">
            {/* Ảnh chính */}
            <div className="grid__row product-img">
            <img
              src={mainImage}
              alt="product"
              className="product-detail__img"
            />
            </div>
            <div className="grid__row img-preview">
              {thumbs.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className="product-preview__img"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Cột thông tin sản phẩm */}
          <div className="grid__column-6">
            <div className="product-info">
              <h1>Đồng hồ đeo tay nam Wokai dây da nâu mặt nâu lịch lãm sang trọng</h1>
              <div className="product-info price">
                <p className="product-info price-current">25,000,000₫</p>
                <p className="product-info price-old">25,000,000₫</p>
              </div>
            </div>
            
            <div class="product-promo">
              <h3>Khuyến mãi:</h3>
              <ul>
                <li>Giảm ngay 25% cho sinh viên</li>
                <li>Tặng balo + chuột không dây</li>
                <li>Trả góp 0% qua thẻ tín dụng</li>
              </ul>
            </div>

            <div className="qnt-selector">
              <p>Chọn số lượng:</p>
              <QuantitySelector/>
            </div>

            <div className="buy-btn">
              <button className="buy-now">
                Mua ngay
              </button> 
            
             <br></br>

              <button className="add-to-cart">
                Thêm vào giỏ hàng
              </button> 
            </div>
          </div>
        </div>
        
        <div className="grid__row tabs">
              <Tabs/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
