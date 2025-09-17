export default function SearchArea() {
  return (
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
  );
}
