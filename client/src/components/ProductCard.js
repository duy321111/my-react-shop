import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

  const imageUrl = product.images?.[0] || product.image;

  return (
    <div className="grid__column-2-4">
      <Link className="home-product-item" to={`/product/${product._id}`}>
        {/* Ảnh sản phẩm */}
        <div
          className="home-product-item__img"
           style={{
                  backgroundImage: `url(/img/${process.env.PUBLIC_URL}${ product.image})`
                }}
        ></div>

        {/* Tên sản phẩm */}
        <h4 className="home-product-item__name">{product.name}</h4>

        {/* Giá sản phẩm */}
        <div className="home-product-item__price">
          <span className="home-product-item__price-old">
            {product.priceOld?.toLocaleString()}₫
          </span>
          <span className="home-product-item__price-current">
            {product.priceCurrent?.toLocaleString()}₫
          </span>
        </div>

        {/* Hành động: yêu thích, sao, số lượng bán */}
        <div className="home-product-item__action">
          <span
            className={`home-product-item__like ${
              product.isFavorite ? "home-product-item__like--liked" : ""
            }`}
          >
            <i className="home-product-item__like-icon-empty fa-regular fa-heart"></i>
            <i className="home-product-item__like-icon-fill fa-solid fa-heart"></i>
          </span>

          <div className="home-product-item__rating">
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={`fa-solid fa-star ${
                  index < Math.round(product.rating)
                    ? "home-product-item__star--gold"
                    : ""
                }`}
              ></i>
            ))}
          </div>

          <div className="home-product-item__sold--wrap">
            <span className="home-product-item__sold">{product.sold}</span>
            <span className="home-product-sold-text">đã bán</span>
          </div>
      
        </div>

        {/* Thương hiệu & xuất xứ */}
        <div className="home-product-item__origin">
          <span className="home-product-item__brand">{product.brand?.name}</span>
          <span className="home-product-item__origin-name">
            {product.origin}
          </span>
        </div>

        {/* Yêu thích */}
        {product.isFavorite && (
          <div className="home-product-item__favourite">
            <i className="fa-solid fa-check"></i>
            <span>Yêu thích</span>
          </div>
        )}

        {/* Sale-off */}
        {product.saleOff > 0 && (
          <div className="home-product-item__sale-off">
            <span className="home-product-item__sale-off-percent">
              {product.saleOff}%
            </span>
            <span className="home-product-item__sale-off-lable">GIẢM</span>
          </div>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;
