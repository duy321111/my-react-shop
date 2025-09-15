// src/components/ProductList.js
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ title, products }) => {
  return (
    <div className="grid__row promotion-product">
      <h1>{title}</h1>
      <div className="grid__full-width promotion-product-list__wrapper">
        <div className="grid__full-width promotion-product-list">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Không có sản phẩm nào.</p>
          )}
        </div>
        <div className="load-product">
          <button className="load-product__btn">Xem thêm sản phẩm</button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;