import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ title, products }) => {
  const LOAD_COUNT = 10; // số sản phẩm load mỗi lần
  const [visibleCount, setVisibleCount] = useState(LOAD_COUNT);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + LOAD_COUNT);
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="grid__row promotion-product">
      <h1>{title}</h1>
      <div className="grid__full-width promotion-product-list__wrapper">
        <div className="grid__full-width promotion-product-list">
          {Array.isArray(products) && products.length > 0 ? (
            visibleProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))
          ) : (
            <p>Không có sản phẩm nào.</p>
          )}
        </div>

        {visibleCount < products.length && (
          <div className="load-product">
            <button onClick={handleLoadMore} className="load-product__btn">
              Xem thêm sản phẩm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
