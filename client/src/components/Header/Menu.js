import { Link, useNavigate } from "react-router-dom";


export default function Menu() {
  return (
    <div className="header__menu">
        <ul className="header__menu-list">
            <li className="header__menu-list-item">
                <Link to="/category" className="header__menu-item-info">
                    <i class="fa-solid fa-laptop"></i>
                    <span>Laptop</span>
                </Link>
            </li>

            <li className="header__menu-list-item">
                <a href="./category.html" className="header__menu-item-info">
                    <i className="fa-solid fa-mobile-screen-button"></i>
                    <span>Điện thoại</span>
                </a>
            </li>

            <li className="header__menu-list-item">
                <a href="./category.html" className="header__menu-item-info">
                    <i className="fa-solid fa-clock"></i>
                    <span>Đồng hồ</span>
                </a>
            </li>

            <li className="header__menu-list-item">
                <a href="./category.html" className="header__menu-item-info">
                    <i className="fa-solid fa-tablet-screen-button"></i>
                    <span>Tablet</span>
                </a>
            </li>

            <li className="header__menu-list-item">
                <a href="./category.html" className="header__menu-item-info">
                    <i className="fa-solid fa-microphone"></i>
                    <span>Loa/Mic/Webcam</span>
                </a>
            </li>
        
            <li className="header__menu-list-item">
                <a href="./category.html" className="header__menu-item-info">
                    <i className="fa-solid fa-display"></i>
                    <span>Màn hình</span>
                </a>
            </li>

            <li className="header__menu-list-item">
                <a href="./category.html" className="header__menu-item-info">
                    <i className="fa-solid fa-computer-mouse"></i>
                    <span>Chuột</span>
                </a>
            </li>

            <li className="header__menu-list-item">
                <a href="./category.html" className="header__menu-item-info">
                    <i className="fa-solid fa-keyboard"></i>
                    <span>Bàn phím</span>
                </a>
            </li>
        </ul>

    </div>
  );
}
