import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../config";

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [hoverCart, setHoverCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // khai báo state
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const token = localStorage.getItem("token");
  
  const categories = [
    { name: "Laptop", icon: "fa-laptop" },
    { name: "Điện thoại", icon: "fa-mobile-screen-button" },
    { name: "Đồng hồ", icon: "fa-clock" },
    { name: "Tablet", icon: "fa-tablet-screen-button" },
    { name: "Loa/Mic/Webcam", icon: "fa-microphone" },
    { name: "Màn hình", icon: "fa-display" },
    { name: "Chuột", icon: "fa-computer-mouse" },
    { name: "Bàn phím", icon: "fa-keyboard" },
  ];
  const [form, setForm] = useState({
    name: "",
    avatar: "",
    phone: "",
    gender: "",
    email: "",
    province: "",
    ward: "",
    detail: ""
  });

  // Lấy thông tin user
  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          const data = res.data || {};
          setForm({
            name: data.name || "",
            avatar: data.avatar || "",
            phone: data.phone || "",
            gender: data.gender || "",
            email: data.email || "",
            province: "",
            ward: "",
            detail: ""
          });
        })
        .catch(() => setForm({}));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setForm({});
    window.location.href = "/";
  };

  // Search API
  useEffect(() => {
    if (keyword.trim() === "") {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(() => {
      axios
        .get(`${API_URL}/api/products/search?keyword=${keyword}`)
        .then((res) => {
          setSuggestions(res.data || []);
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

  // Cart API
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`${API_URL}/api/cart/${userId}`);
        setCartItems(res.data?.items || []);
      } catch (err) {
        console.error("Lỗi lấy giỏ hàng:", err);
      }
    };
    fetchCart();
    window.addEventListener("cartUpdated", fetchCart);
    return () => window.removeEventListener("cartUpdated", fetchCart);
  }, [userId]);

  const handleDelete = async (productId) => {
    if (!userId || !token) return;
    try {
      const res = await axios.delete(
        `${API_URL}/api/cart/${userId}/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
    }
  };

  return (
    <div className="header-with-search">
      {/* Logo */}
      <div className="header__logo">
        <Link to="/" className="header__logo-link">
          <img
            src="/img/logo-removebg-preview.png"
            className="header__logo-img"
            alt="Logo"
          />
        </Link>
      </div>

      {/* Search */}
      <div className="header__search" style={{ position: "relative" }}>
          <div className="header__menu-mobile hide-on-pc-tablet">
            <button
              className="menu-toggle-btn"
              onClick={() => setShowMenu(!showMenu)}
            >
              <i className="fa-solid fa-bars"></i>
              <span>MENU</span>
          </button>

          {showMenu && (
            <ul className="header__menu-list-mobile">
              {categories.map((cat) => (
                <li key={cat.name} className="header__menu-list-item-mobile">
                  <Link
                    to={`/category/${encodeURIComponent(cat.name)}`}
                    className="header__menu-item-info-mobile"
                    onClick={() => setShowMenu(false)} // tắt menu khi click
                  >
                    <i className={`fa-solid ${cat.icon}`}></i>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="header__search-input-wrap">
          <input
            type="text"
            className="header__search-input"
            placeholder="Bạn cần tìm gì..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowDrop(true)}
          />

          {/* Dropdown */}
          {showDrop && suggestions.length > 0 && (
            <div className="search-dropdown">
              {suggestions.map((item) => {
                if (!item || !item._id) return null;
                return (
                  <div
                    key={item._id}
                    className="search-dropdown-item"
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
                    <img
                      src={item.image ? `${process.env.PUBLIC_URL}/img/${item.image}` : "/img/no_image.png"}
                      alt=""
                    />
                    <div className="search-dropdown-info">
                      <span className="search-dropdown-name">{item.name}</span>
                      <span className="search-dropdown-price">
                        {item.priceCurrent?.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button className="header__search-btn" onClick={handleSearch}>
          <i className="header__search-btn-icon fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {/* Cart */}
      <div
        className="header__cart"
        style={{ position: "relative" }}
        onMouseEnter={() => setHoverCart(true)}
        onMouseLeave={() => setHoverCart(false)}
      >
        <div className="header__cart-wrap">
          <i className="header__cart-icon fa-solid fa-cart-shopping"></i>
          <span className="header__cart-notice">
            {cartItems.reduce((sum, i) => sum + (i.quantity || 0), 0)}
          </span>

          {hoverCart && (
            <div className="header__cart-list">
              {cartItems.length === 0 ? (
                <div className="header__cart-list--no-cart">
                  <img
                    src="/img/no_cart.png"
                    alt=""
                    className="header__cart-list--no-cart-img"
                  />
                  <span className="header__cart-list--no-cart-msg">
                    Chưa có sản phẩm
                  </span>
                </div>
              ) : (
                <>
                  <h4 className="header__cart-heading">Sản phẩm đã thêm</h4>
                  <ul className="header__cart-list-item">
                    {cartItems.map((item) => {
                      if (!item.productId) return null;
                      return (
                        <li key={item.productId._id} className="header__cart-item">
                          <img
                            src={
                              item.image
                                ? `${process.env.PUBLIC_URL}/img/${item.image}`
                                : "/img/no_image.png"
                            }
                            alt=""
                            className="header__cart-img"
                          />
                          <div className="header__cart-item-info">
                            <div className="header__cart-item-head">
                              <h5 className="header__cart-item-name">{item.name}</h5>
                              <div className="header__cart-item-price-wrap">
                                <span className="header__cart-item-price">
                                  {item.price?.toLocaleString() || 0}đ
                                </span>
                                <span className="header__cart-item-multiply">x</span>
                                <span className="header__cart-item-quantity">
                                  {item.quantity || 0}
                                </span>
                              </div>
                            </div>
                            <div className="header__cart-item-body">
                              <span
                                className="header__cart-item-remove"
                                onClick={() => handleDelete(item.productId._id)}
                              >
                                Xoá
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <Link
                    to="/cart"
                    className="header__cart-view-cart btn btn--primary"
                  >
                    Xem giỏ hàng
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* User */}
      <div className="header__user hide-on-pc">
        {user ? (
          <li className="header__navbar-item header__navbar-user">
            <img
              src={form.avatar ? `${API_URL}${form.avatar}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="avatar"
              className="header__navbar-user-img"
            />
            <ul className="header__navbar-user-menu">
              <li className="header__navbar-user-item">
                <Link to="/profile">Tài khoản của tôi</Link>
              </li>
              <li className="header__navbar-user-item">
                <Link to="/orders">Đơn mua</Link>
              </li>
              <li className="header__navbar-user-item header__navbar-user-item--separate">
                <button onClick={handleLogout}>Đăng xuất</button>
              </li>
            </ul>
          </li>
        ) : (
          <li className="header__navbar-item header__navbar-item--strong">
            <Link to="/login">Đăng nhập</Link>
          </li>
        )}
      </div>
    </div>
  );
}
