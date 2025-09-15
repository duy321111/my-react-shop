import React from "react";

const Filter = () => {
    return (
    <div className="home-filter">
        <span className="home-filter__label">Sắp xếp theo</span>
        <button className="home-filter__btn btn">Phổ biến</button>
        <button className="home-filter__btn btn btn--primary">Mới nhất</button>
        <button className="home-filter__btn btn">Bán chạy</button>

        <div className="select-input">
            <span className="select-input__label">Giá</span>
            <i className="select-input__icon fa-solid fa-angle-down"></i>
            <ul className="select-input__list">
                <li className="select-input__item">
                    <a href="" className="select-input-link">
                        Giá: Thấp đến cao
                        
                    </a>
                </li>

                <li className="select-input__item">
                    <a href="" className="select-input-link">
                        Giá: Thấp đến cao
                    </a>
                </li>

            </ul>
        </div>

        <div className="home-filter__page">
            <span className="home-filter__page-num">
                <span className="home-filter__page-current">1</span>/
                <span className="home-filter__page-max">1</span>
            </span>

            <div className="home-filter__page-control">
                <a href="" className="home-filter__page-btn home-filter__page-btn--disabled">
                    <i className="home-filter__page-icon fa-solid fa-angle-left"></i>
                </a>

                    <a href="" className="home-filter__page-btn">
                    <i className="home-filter__page-icon fa-solid fa-angle-right"></i>
                </a>

            </div>
        </div>
    </div>
    )
}
export default Filter;