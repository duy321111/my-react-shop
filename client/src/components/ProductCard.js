// src/components/ProductCard.js
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="grid__column-2-4">
      <a className="home-product-item" href="#">

        <div
          className="home-product-item__img"
          style={{ backgroundImage: `url(${product.image})` }}
        >
        </div>

        <h4 className="home-product-item__name">{product.name}</h4>

        <div className="home-product-item__price">
          <span className="home-product-item__price-old">{product.oldPrice}</span>
          <span className="home-product-item__price-current">{product.currentPrice}</span>
        </div>

        <div className="home-product-item__action">
          <span className={`home-product-item__like ${product.isFavorite ? 'home-product-item__like--liked' : ''}`}>
            <i className="home-product-item__like-icon-empty fa-regular fa-heart"></i>
            <i className="home-product-item__like-icon-fill fa-solid fa-heart"></i>
          </span>

          <div className="home-product-item__rating">
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={`fa-solid fa-star ${index < product.rating ? 'home-product-item__star--gold' : ''}`}
              ></i>
            ))}
          </div>
          <span className="home-product-item__sold">{product.sold} đã bán</span>
        </div>

        <div className="home-product-item__origin">
          <span className="home-product-item__brand">{product.brand}</span>
          <span className="home-product-item__origin-name">{product.origin}</span>
        </div>
        
        {product.isFavorite && (
          <div className="home-product-item__favourite">
            <i className="fa-solid fa-check"></i>
            <span>Yêu thích</span>
          </div>
        )}

        <div className="home-product-item__sale-off">
          <span className="home-product-item__sale-off-percent">{product.saleOff}%</span>
          <span className="home-product-item__sale-off-lable">GIẢM</span>
        </div>

      </a>
      
    </div>
  );
};

export default ProductCard;