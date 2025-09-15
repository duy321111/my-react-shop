import React from 'react';

const Category = () => {
  return (
    <nav className="category">
      <h3 className="category__heading">
        <i className="category__heading-icon fa-solid fa-list"></i>
        Danh mục
      </h3>

      <ul className="category-list">
        <li className="category-item category-item--active">
          <a href="#" className="category-item__link">Samsung</a>
        </li>

        <li className="category-item">
          <a href="#" className="category-item__link">iPhone</a>
        </li>

        <li className="category-item">
          <a href="#" className="category-item__link">Oppo</a>
        </li>
      </ul>
    </nav>
  );
};

export default Category;
