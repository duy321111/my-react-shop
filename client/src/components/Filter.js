import React, { useState } from "react";

const Filter = ({ onSortChange }) => {
  const [active, setActive] = useState("");

  const handleSort = (type) => {
    setActive(type);
    onSortChange(type);
  };

  return (
    <div className="home-filter">
      <span className="home-filter__label">Sắp xếp theo</span>

      <button
        className={`home-filter__btn btn ${active === "popular" ? "btn--primary" : ""}`}
        onClick={() => handleSort("popular")}
      >
        Phổ biến
      </button>
      <button
        className={`home-filter__btn btn ${active === "newest" ? "btn--primary" : ""}`}
        onClick={() => handleSort("newest")}
      >
        Mới nhất
      </button>

      <div className="select-input">
        <span className="select-input__label">Giá</span>
        <i className="select-input__icon fa-solid fa-angle-down"></i>
        <ul className="select-input__list">
          <li className="select-input-item">
            <button
              className="select-input-link"
              onClick={() => handleSort("priceAsc")}
            >
              Giá: Thấp đến cao
            </button>
          </li>
          <li className="select-input-item">
            <button
              className="select-input-link"
              onClick={() => handleSort("priceDesc")}
            >
              Giá: Cao đến thấp
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
