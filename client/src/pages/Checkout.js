import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Checkout = () => {
  const [address, setAddress] = useState({
    name: "Nguyễn Đức Minh",
    phone: "(+84) 849 822",
    detail: "Số 526, Đường Khúc Thừa Dụ, Linh Trung, Khu Phố 6, Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí Minh",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const cartItems = [
    {
      id: 1,
      name: "Đồng hồ đeo tay nam Genius Emy GEO...",
      image: "img/dongho.webp",
      price: 180000,
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 15000;
  const total = subtotal + shippingFee;

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đặt hàng thành công!\nTổng tiền: ${total.toLocaleString()}đ\nPhương thức: ${paymentMethod === "cod" ? "Thanh toán khi nhận hàng" : "Chuyển khoản"}`);
  };

  return (
    <div className="app__container">
      <Header />
      <div className="grid">
        <div className="grid__row checkout">
          <div className="checkout-container">
            <h2>Địa Chỉ Nhận Hàng</h2>
            <div className="address-info">
              <p>{address.name}</p>
              <p>{address.phone}</p>
              <p>{address.detail}</p>
              <button className="edit-btn">Chỉnh sửa</button>
            </div>

            <h2>Sản phẩm</h2>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <p>{item.name}</p>
                    <p>Đơn giá: {item.price.toLocaleString()}đ</p>
                    <p>Số lượng: {item.quantity}</p>
                    <p>Thành tiền: {(item.price * item.quantity).toLocaleString()}đ</p>
                  </div>
                </div>
              ))}
            </div>

            <h2>Phương thức thanh toán</h2>
            <form onSubmit={handleSubmit} className="payment-form">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={handlePaymentChange}
                />
                Thanh toán khi nhận hàng (COD)
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={handlePaymentChange}
                />
                Chuyển khoản ngân hàng
              </label>

              <div className="total-summary">
                <p>Tổng đơn hàng: {subtotal.toLocaleString()}đ</p>
                <p>Phí vận chuyển: {shippingFee.toLocaleString()}đ</p>
                <p className="total-amount">Tổng thanh toán: <strong>{total.toLocaleString()}đ</strong></p>
              </div>

              <button type="submit" className="place-order-btn">Đặt hàng</button>
            </form>
          </div>
        </div>
      </div> 
      <Footer />
    </div>
  );
};

export default Checkout;