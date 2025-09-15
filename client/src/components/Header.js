import { Link } from "react-router-dom";

export default function Header() {
  return(
    <header className="header">
            <div className="grid">
                <nav className="header__navbar">
                    <ul className="header__navbar-list">
                        <li className="header__navbar-item header__navbar-item-has-qr header__navbar-item--separate">
                            Vào cửa hàng trên ứng dụng
                            <div className="header__qr">
                                <img src="/img/qr_code.png" alt="QR code" className="header__qr-img"/> 
                                <div className="header__qr-apps">
                                    <a href="" className="header__qr-link">
                                        <img src="/img/Google-Play-Logo.png" alt="ggplay" className="header__qr-download-img"/>
                                    </a>
                                    <a href="" className="header__qr-link">
                                        <img src="/img/appstore.png" alt="appstore" className="header__qr-download-img"/>
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li className="header__navbar-item">

                            <span className="header__navbar-title--no-pointer">Kết nối </span>

                            <a href="" className="header__navbar-icon-link">
                                <i className="header__navbar-icon fa-brands fa-facebook"></i>
                            </a>

                             <a href="" className="header__navbar-icon-link">
                                <i className="header__navbar-icon fa-brands fa-instagram"></i>
                            </a>
                            
                        </li>
                    </ul>
    
                    <ul className="header__navbar-list">
    
                        <li className="header__navbar-item header__navbar-item-has-notify">
                            <a href="" className="header__navbar-item-link">
                                <i className="header__navbar-icon fa-regular fa-bell"></i>
                                Thông báo
                            </a>

                            <div className="header__notify">
                                <header className="header__notify-header">
                                    <h3>
                                        Thông báo mới nhận
                                    </h3>
                                </header>
                                <ul className="header__notify-list">
                                    <li className="header__notify-item header__notify-item--viewed">
                                        <a href="" className="header__notify-link">
                                            <img src="/img/deal.jpg" alt="" className="header__notify-img"/>
                                            <div className="header__notify-info">
                                                <span className="header__notify-name">Nhanh len keo lo trend!</span>
                                                <span className="header__notify-description">Sam ngay quan ao abcxyz</span>
                                            </div> 
                                        </a>
                                    </li>
                                    <li className="header__notify-item header__notify-item--viewed">
                                        <a href="" className="header__notify-link">
                                            <img src="/img/deal.jpg" alt="" className="header__notify-img"/>
                                            <div className="header__notify-info">
                                                <span className="header__notify-name">Nhanh len keo lo trend!</span>
                                                <span className="header__notify-description">Sam ngay quan ao abcxyz</span>
                                            </div> 
                                        </a>
                                    </li>
                                    <li className="header__notify-item header__notify-item--viewed">
                                        <a href="" className="header__notify-link">
                                            <img src="/img/deal.jpg" alt="" className="header__notify-img"/>
                                            <div className="header__notify-info">
                                                <span className="header__notify-name">Nhanh len keo lo trend!</span>
                                                <span className="header__notify-description">Sam ngay quan ao abcxyz</span>
                                            </div> 
                                        </a>
                                    </li>
                                </ul>
                                <footer className="header__notify-footer">
                                    <a href="" className="header__notify-footer-btn">Xem tất cả</a>
                                </footer>
                            </div>
                        </li>
    
                        <li className="header__navbar-item">
                             <a href="" className="header__navbar-item-link">
                               <i className="header__navbar-icon fa-regular fa-circle-question"></i>
                                Trợ giúp
                            </a>
                        </li>
    
                        {/* <!-- <li className="header__navbar-item header__navbar-item--strong header__navbar-item--separate">Đăng ký</li>
                        <li className="header__navbar-item header__navbar-item--strong">Đăng nhập</li> --> */}

                        <li className="header__navbar-item  header__navbar-user">
                            <img src="https://down-vn.img.susercontent.com/file/a9dee70209e373697ae330d7cac1dd8b_tn" alt="" className="header__navbar-user-img"/>
                            <span className="header__navbar-user-name">Duy Nguyễn</span>
                            <ul className="header__navbar-user-menu">
                                <li className="header__navbar-user-item">
                                    <a href="">Tài khoản của tôi</a>
                                </li>

                                <li className="header__navbar-user-item">
                                    <a href="">Địa chỉ của tôi</a>
                                </li>

                                <li className="header__navbar-user-item">
                                    <a href="">Đơn mua</a>
                                </li>

                                <li className="header__navbar-user-item header__navbar-user-item--separate">
                                    <a href="">Đăng xuất</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div className="header-with-search">
                    <div className="header__logo">
                        <a href="index.html" className="header__logo-link">
                            <img src="/img/logo-removebg-preview.png" className="header__logo-img"/> 
                        </a>
                    </div>
                    
                    <div className="header__search">
                        <div className="header__search-input-wrap">
                            <input type="text" className="header__search-input" placeholder="Bạn cần tìm gì..."/> 

                            <div className="header__search-history">
                                <h3 className="header__search-history-heading">Lịch sử tìm kiếm</h3>
                                <ul className="header__search-history-list">
                                    <li className="header__search-history-item">
                                        <a href="" className="">haha</a>
                                    </li>
                                    <li className="header__search-history-item">
                                        <a href="" className="">kaka</a>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        <div className="header__search-selection">
                            <span className="header__search-select-lable">Trong shop</span>
                            <i className="header__search-select-icon fa-solid fa-angle-down"></i>
                            <ul className="header__search-option">
                                <li className="header__search-option-item header__search-option-item--active">
                                    <span>
                                        Trong shop
                                    </span>
                                    <i className="fa-solid fa-check"></i>
                                </li>

                                <li className="header__search-option-item">
                                    <span>
                                        Ngoài shop
                                    </span>
                                    <i className="fa-solid fa-check"></i>
                                </li>
                            </ul>
                        </div>

                        <button className="header__search-btn">
                            <i className="header__search-btn-icon fa-solid fa-magnifying-glass"></i>
                        </button>
                        
                    </div>
                    
                    <div className="header__cart">
                        <div className="header__cart-wrap">
                            <i className="header__cart-icon fa-solid fa-cart-shopping"></i>
                            <span className="header__cart-notice">3</span>
                            {/* <!-- No cart --> */}
                            <div className="header__cart-list ">
                                <img src="/img/no_cart.png" alt="" className="header__cart-list--no-cart-img"/> 
                                <span className="header__cart-list--no-cart-msg">Chưa có sản phẩm</span>

                                <h4 className="header__cart-heading">Sản phẩm đã thêm</h4>
                                <ul className="header__cart-list-item">
                                    {/* <!-- cart-item -->  */}
                                    <li className="header__cart-item">
                                        <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9rdakidkg0q75_tn" alt="" className="header__cart-img"/> 
                                        <div className="header__cart-item-info">
                                            <div className="header__cart-item-head">
                                                <h5 className="header__cart-item-name">Bộ kem đặc trị vùng mặt</h5>
                                                <div className="header__cart-item-price-wrap">
                                                    <span className="header__cart-item-price">200.000.000d</span>
                                                    <span className="header__cart-item-multiply">x</span>
                                                    <span className="header__cart-item-quantity">3</span>
                                                </div>
                                            </div>
                                            <div className="header__cart-item-body">
                                                <span className="header__cart-item-description">aaaa</span>
                                                <span className="header__cart-item-remove">Xoá</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="header__cart-item">
                                        <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9rdakidkg0q75_tn" alt="" className="header__cart-img"/> 
                                        <div className="header__cart-item-info">
                                            <div className="header__cart-item-head">
                                                <h5 className="header__cart-item-name">Bộ kem đặc trị vùng mặt Bộ kem đặc trị vùng mặt Bộ kem đặc trị vùng mặt Bộ kem đặc trị vùng mặt Bộ kem đặc trị vùng mặt</h5>
                                                <div className="header__cart-item-price-wrap">
                                                    <span className="header__cart-item-price">200.000.000d</span>
                                                    <span className="header__cart-item-multiply">x</span>
                                                    <span className="header__cart-item-quantity">3</span>
                                                </div>
                                            </div>
                                            <div className="header__cart-item-body">
                                                <span className="header__cart-item-description">aaaa</span>
                                                <span className="header__cart-item-remove">Xoá</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="header__cart-item">
                                        <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9rdakidkg0q75_tn" alt="" className="header__cart-img"/> 
                                        <div className="header__cart-item-info">
                                            <div className="header__cart-item-head">
                                                <h5 className="header__cart-item-name">Bộ kem đặc trị vùng mặt</h5>
                                                <div className="header__cart-item-price-wrap">
                                                    <span className="header__cart-item-price">200.000.000d</span>
                                                    <span className="header__cart-item-multiply">x</span>
                                                    <span className="header__cart-item-quantity">3</span>
                                                </div>
                                            </div>
                                            <div className="header__cart-item-body">
                                                <span className="header__cart-item-description">aaaa</span>
                                                <span className="header__cart-item-remove">Xoá</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="header__cart-item">
                                        <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9rdakidkg0q75_tn" alt="" className="header__cart-img"/> 
                                        <div className="header__cart-item-info">
                                            <div className="header__cart-item-head">
                                                <h5 className="header__cart-item-name">Bộ kem đặc trị vùng mặt</h5>
                                                <div className="header__cart-item-price-wrap">
                                                    <span className="header__cart-item-price">200.000.000d</span>
                                                    <span className="header__cart-item-multiply">x</span>
                                                    <span className="header__cart-item-quantity">3</span>
                                                </div>
                                            </div>
                                            <div className="header__cart-item-body">
                                                <span className="header__cart-item-description">aaaa</span>
                                                <span className="header__cart-item-remove">Xoá</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="header__cart-item">
                                        <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9rdakidkg0q75_tn" alt="" className="header__cart-img"/> 
                                        <div className="header__cart-item-info">
                                            <div className="header__cart-item-head">
                                                <h5 className="header__cart-item-name">Bộ kem đặc trị vùng mặt</h5>
                                                <div className="header__cart-item-price-wrap">
                                                    <span className="header__cart-item-price">200.000.000d</span>
                                                    <span className="header__cart-item-multiply">x</span>
                                                    <span className="header__cart-item-quantity">3</span>
                                                </div>
                                            </div>
                                            <div className="header__cart-item-body">
                                                <span className="header__cart-item-description">aaaa</span>
                                                <span className="header__cart-item-remove">Xoá</span>
                                            </div>
                                        </div>
                                    </li>
                                    
                                   
                                </ul>

                                <a href="" className="header__cart-view-cart btn btn--primary">Xem giỏ hàng</a>
                            </div>
                        </div>
                    </div>
                </div>

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

            </div>
        </header>
  )
}