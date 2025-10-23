import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import QuantitySelector from "../components/QuantitySelector";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || !token) {
      alert("Bạn cần đăng nhập để xem giỏ hàng!");
      window.location.href = "/login";
    }
  }, [user, token]);

  // Lấy giỏ hàng từ API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cart/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
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

  // Cập nhật số lượng
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await axios.put(
        `http://localhost:5000/api/cart/${user._id}/${productId}`,
        { productId, quantity: newQuantity, userId: user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      console.error("Lỗi cập nhật số lượng:", err);
    }
  };

  // Xóa sản phẩm
  const handleDelete = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/${user._id}/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(res.data.items);
      setSelectedItems((prev) => prev.filter((id) => id !== productId));
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
    }
  };

  //  Chọn từng sản phẩm
  const handleSelectItem = (productId) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Chọn tất cả
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.productId._id));
    }
  };

  //Tính tổng tiền sản phẩm đã chọn
  const total = cartItems
    .filter((item) => selectedItems.includes(item.productId._id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Thanh toán: lưu danh sách sản phẩm chọn rồi điều hướng sang checkout
  const handleCheckout = () => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    window.location.href = "/checkout";
  };

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
              <th>
                <div className="check-box">
                  <input
                    type="checkbox"
                    checked={
                      selectedItems.length === cartItems.length &&
                      cartItems.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </div>
              </th>
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
                  <div className="check-box">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.productId._id)}
                      onChange={() => handleSelectItem(item.productId._id)}
                    />
                  </div>
                </td>
                <td>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/${item.image}`}
                    alt={item.name}
                    width="70"
                  />
                  <p>{item.name}</p>
                </td>
                <td><p className="hide-on-pc-tablet">Đơn giá: </p>{item.price.toLocaleString()}đ</td>
                <td><p className="hide-on-pc-tablet">Số lượng:</p>
                  <QuantitySelector
                    quantity={item.quantity}
                    onChange={(newQuantity) =>
                      handleQuantityChange(item.productId._id, newQuantity)
                    }
                  />
                </td>
                <td><p className="hide-on-pc-tablet">Tổng tiền: </p>{(item.price * item.quantity).toLocaleString()}đ</td>
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
              Tổng cộng ({selectedItems.length} sản phẩm):{" "}
              <strong>{total.toLocaleString()}đ</strong>
            </b>
          </p>
        </div>

        <div className="cart-actions">
          <a href="/">
            <i className="fas fa-circle-arrow-left"></i> Tiếp tục mua sắm
          </a>
          <button
            disabled={selectedItems.length === 0}
            onClick={handleCheckout}
          >
            Thanh toán ngay
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
