import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Header() {
    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDrop, setShowDrop] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [hoverCart, setHoverCart] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
  // --- Search API ---
  useEffect(() => {
    if (keyword.trim() === "") {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(() => {
      axios
        .get(`http://localhost:5000/api/products/search?keyword=${keyword}`)
        .then((res) => {
          setSuggestions(res.data);
          setShowDrop(true);
        })
        .catch(() => setSuggestions([]));
    }, 300);

    return () => clearTimeout(delay);
  }, [keyword]);

  const handleSearch = () => {
    if (keyword.trim() !== "") {
      navigate(`/search?keyword=${keyword}`);
      setShowDrop(false);
    }
  };

  // --- Cart API ---
  useEffect(() => {
    const fetchCart = async () => {
        
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCartItems(res.data?.items || []);
      } catch (error) {
        console.error("Lỗi lấy giỏ hàng:", error);
      }
    };
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
      setCartItems(cartItems.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
    }
  };

  return (
    <div className="header-with-search">
      {/* --- Logo --- */}
      <div className="header__logo">
        <Link to="/" className="header__logo-link">
          <img src="/img/logo-removebg-preview.png" className="header__logo-img" alt="Logo" />
        </Link>
      </div>

      {/* --- Search --- */}
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

      {/* --- Cart --- */}
      <div
        className="header__cart"
        style={{ position: "relative" }}
        onMouseEnter={() => setHoverCart(true)}
        onMouseLeave={() => setHoverCart(false)}
      >
        <div className="header__cart-wrap">
          <i className="header__cart-icon fa-solid fa-cart-shopping"></i>
          <span className="header__cart-notice">
            {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
          </span>

          {hoverCart && (
            <div className="header__cart-list">
              {cartItems.length === 0 ? (
                <div className="header__cart-list--no-cart">
                    <img src="/img/no_cart.png" alt="" className="header__cart-list--no-cart-img" />
                    <span className="header__cart-list--no-cart-msg">Chưa có sản phẩm</span>
                </div>
                
              ) : (
                <>
                  <h4 className="header__cart-heading">Sản phẩm đã thêm</h4>
                  <ul className="header__cart-list-item">
                    {cartItems.map((item) => (
                      <li key={item.productId} className="header__cart-item">
                        <img
                          src={`${process.env.PUBLIC_URL}/img/${item.image}`}
                          alt=""
                          className="header__cart-img"
                        />
                        <div className="header__cart-item-info">
                          <div className="header__cart-item-head">
                            <h5 className="header__cart-item-name">{item.name}</h5>
                            <div className="header__cart-item-price-wrap">
                              <span className="header__cart-item-price">
                                {item.price.toLocaleString()}đ
                              </span>
                              <span className="header__cart-item-multiply">x</span>
                              <span className="header__cart-item-quantity">{item.quantity}</span>
                            </div>
                          </div>
                          <div className="header__cart-item-body">
                            <span className="header__cart-item-remove" onClick={() => handleRemove(item.productId)}>Xoá</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Link to="/cart" className="header__cart-view-cart btn btn--primary">
                    Xem giỏ hàng
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
