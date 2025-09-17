import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import QuantitySelector from "../components/QuantitySelector";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Laptop Victus Gaming", price: 25000000, quantity: 1, img: "img/lap.png", selected: true },
    { id: 2, name: "Đồng hồ Wokai dây da", price: 1200000, quantity: 2, img: "img/dongho.webp", selected: false },
    { id: 3, name: "Tai nghe Bluetooth", price: 800000, quantity: 1, img: "img/tai-nghe.png", selected: true },
  ]);

  // Thay đổi số lượng
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Xóa sản phẩm
  const handleDelete = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Tick chọn/bỏ chọn sản phẩm
  const handleSelect = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Chọn tất cả
  const handleSelectAll = (checked) => {
    setCartItems((prev) => prev.map((item) => ({ ...item, selected: checked })));
  };

  // Kiểm tra có chọn hết chưa
  const allSelected = cartItems.every((item) => item.selected);

  // Tính tổng chỉ cho sản phẩm được chọn
  const total = cartItems.reduce(
    (sum, item) => (item.selected ? sum + item.price * item.quantity : sum),
    0
  );

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
                <label className="check-box">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                 
                </label>
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
              <tr key={item.id}>
                <td>
                  <label className="check-box">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleSelect(item.id)}
                    />
                
                  </label>
                </td>
                <td>
                  <img src={item.img} alt={item.name} width="70" />
                  <p>{item.name}</p>
                </td>
                <td>{item.price.toLocaleString()}đ</td>
                <td>
                  <div className="QuantitySelector-Cart-wrap">
                    <QuantitySelector
                      quantity={item.quantity}
                      onChange={(newQuantity) =>
                        handleQuantityChange(item.id, newQuantity)
                      }
                    />
                  </div>
                </td>
                <td>{(item.price * item.quantity).toLocaleString()}đ</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.id)}
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
          <a href="Category">
            <i className="fas fa-circle-arrow-left"></i> Tiếp tục mua sắm
          </a>
          <button disabled={total === 0}>Thanh toán ngay
           
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
