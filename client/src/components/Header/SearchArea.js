import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchArea() {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (keyword.trim() === "") {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(() => {
      axios
        .get(`http://localhost:5000/api/products/search?keyword=${keyword}`)
        .then((res) => {
          setSuggestions(res.data); // list sản phẩm
          setShowDrop(true);
        })
        .catch(() => setSuggestions([]));
    }, 300); //

    return () => clearTimeout(delay);
  }, [keyword]);

  const handleSearch = () => {
    if (keyword.trim() !== "") {
      navigate(`/search?keyword=${keyword}`);
      setShowDrop(false);
    }
  };

  return (
    <div className="header-with-search">
      <div className="header__logo">
        <Link to="/" className="header__logo-link">
          <img src="/img/logo-removebg-preview.png" className="header__logo-img" alt="Logo" />
        </Link>
      </div>

      <div className="header__search" style={{ position: "relative" }}>
        <div className="header__search-input-wrap">
          <input
            type="text"
            className="header__search-input"
            placeholder="Bạn cần tìm gì..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowDrop(true)}
          />

          {/* Dropdown suggestion */}
            {showDrop && suggestions.length > 0 && (
            <div className="search-dropdown">
                {suggestions.map((item) => (
                <div
                    key={item._id}
                    className="search-dropdown-item"
                    onClick={() => navigate(`/product/${item._id}`)}
                >
                    <img src={`${process.env.PUBLIC_URL}/img/${item.image}`} alt="" />
                    <div className="search-dropdown-info">
                    <span className="search-dropdown-name">{item.name}</span>
                    <span className="search-dropdown-price">
                        {item.priceCurrent?.toLocaleString("vi-VN")}₫
                    </span>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>

        <button className="header__search-btn" onClick={handleSearch}>
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

                    <Link to="/cart" className="header__cart-view-cart btn btn--primary">
                        Xem giỏ hàng
                    </Link>

                </div>
            </div>
        </div>
    </div>
  );
}
