import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import QuantitySelector from "../components/QuantitySelector";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy user và token từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Nếu chưa đăng nhập thì chuyển về login
  useEffect(() => {
    if (!user || !token) {
      alert("Bạn cần đăng nhập để xem giỏ hàng!");
      window.location.href = "/login";
    }
  }, [user, token]);

  // 1. Lấy giỏ hàng khi load trang
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cart/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error("Lỗi khi tải giỏ hàng:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) fetchCart();
  }, [user?._id, token]);

  // 2. Thay đổi số lượng
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/cart/${user._id}/${productId}`,
        {
          productId,
          quantity: newQuantity,
          userId: user._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      //  Cập nhật lại cartItems từ dữ liệu trả về
      setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
    } catch (err) {
      console.error("Lỗi cập nhật số lượng:", err);
    }
  };



  // 3. Xóa sản phẩm khỏi giỏ hàng
  const handleDelete = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/${user._id}/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartItems(res.data.items);
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
    }
  };


  // 4. Tính tổng tiền
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) return <p>Đang tải giỏ hàng...</p>;

  return (
    <div className="app__container">
      <Header />

      <div className="cart-container">
        <div className="cart-title">
          <i className="fas fa-shopping-cart"></i> Giỏ hàng của bạn
        </div>

        <table>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.productId._id}>
                <td>
                  <img src={`${process.env.PUBLIC_URL}/img/${item.image}`} alt={item.name} width="70" />
                  <p>{item.name}</p>
                </td>
                <td>{item.price.toLocaleString()}đ</td>
                <td>
                  <QuantitySelector
                    quantity={item.quantity}
                    onChange={(newQuantity) =>
                      handleQuantityChange(item.productId._id, newQuantity)
                    }
                  />
                </td>
                <td>{(item.price * item.quantity).toLocaleString()}đ</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.productId._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cart-summary">
          <p>
            <b>
              Tổng cộng: <strong>{total.toLocaleString()}đ</strong>
            </b>
          </p>
        </div>

        <div className="cart-actions">
          <a href="/category">
            <i className="fas fa-circle-arrow-left"></i> Tiếp tục mua sắm
          </a>
          <button disabled={total === 0}>Thanh toán ngay</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
