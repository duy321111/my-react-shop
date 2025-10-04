import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const Checkout = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(true);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // 1. Lấy thông tin người dùng từ DB
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User info:", res.data);
        setUserInfo(res.data);

        // Chọn địa chỉ mặc định hoặc địa chỉ đầu tiên
        if (res.data?.addresses?.length > 0) {
          const defaultIndex = res.data.addresses.findIndex((addr) => addr.isDefault);
          setSelectedAddressIndex(defaultIndex !== -1 ? defaultIndex : 0);
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchUserInfo();
  }, [token]);

  // 2. Lấy danh sách sản phẩm đã chọn từ giỏ hàng
  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem("selectedItems")) || [];
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const filteredItems = res.data.items.filter((item) =>
          selected.includes(item.productId._id)
        );
        setCartItems(filteredItems);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm giỏ hàng:", err);
      }
    };

    if (user?._id) fetchCartItems();
  }, [user?._id, token]);

  // 3. Tính tiền
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 0 ? 15000 : 0;
  const total = subtotal + shippingFee;

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // 4. Gửi đơn hàng lên backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedAddress = userInfo?.addresses?.[selectedAddressIndex] || null;

      const orderData = {
        userId: user._id,
        items: cartItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.price,
          image: item.image
        })),
        totalAmount: total,
        paymentMethod,
        address: selectedAddress
          ? {
              province: selectedAddress.province,
              ward: selectedAddress.ward,
              detail: selectedAddress.detail,
            }
          : null,
      };

      await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Đặt hàng thành công!");
      localStorage.removeItem("selectedItems");
      window.location.href = "/orders";
    } catch (err) {
      console.error("Lỗi khi đặt hàng:", err);
      alert("Đặt hàng thất bại!");
    }
  };

  // Hàm hiển thị địa chỉ
  const renderAddress = () => {
    if (!userInfo?.addresses || userInfo.addresses.length === 0) {
      return <p>Chưa có địa chỉ</p>;
    }
    const address = userInfo.addresses[selectedAddressIndex];
    return (
      <p>{`${address.detail}, ${address.ward}, ${address.province}`}</p>
    );
  };


  return (
    <div className="app__container">
      <Header />
      <div className="grid">
        <div className="grid__row checkout">
          <div className="checkout-container">
            <h2>Địa Chỉ Nhận Hàng</h2>
            <div className="address-info">
              {userInfo ? (
                <>
                  <p><strong>{userInfo.name || "Chưa có tên"}</strong></p>
                  <p>{userInfo.phone || "Chưa có số điện thoại"}</p>
                  {renderAddress()}
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => setIsEditingAddress(true)}
                  >
                    Chỉnh sửa
                  </button>

                  {/* Popup chọn địa chỉ */}
                  {isEditingAddress && (
                    <div className="address-modal">
                      <h3>Chọn địa chỉ giao hàng</h3>
                      {userInfo.addresses.map((addr, index) => (
                        <label key={index} className="address-option">
                          {`${addr.detail}, ${addr.ward}, ${addr.province}`}
                          <input
                            type="radio"
                            name="selectedAddress"
                            value={index}
                            checked={selectedAddressIndex === index}
                            onChange={() => setSelectedAddressIndex(index)}
                          />
                    
                        </label>
                      ))}
                      <div className="address-modal-actions">
                        <button onClick={() => setIsEditingAddress(false)}>Xác nhận</button>
                        <button onClick={() => setIsEditingAddress(false)}>Hủy</button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p>Không tìm thấy thông tin người dùng</p>
              )}
            </div>

            <h2>Sản phẩm</h2>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.productId._id} className="cart-item">
                  <img
                    src={`${process.env.PUBLIC_URL}/img/${item.image}`}
                    alt={item.name}
                    className="item-image"
                  />
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
                <p className="total-amount">
                  Tổng thanh toán: <strong>{total.toLocaleString()}đ</strong>
                </p>
              </div>

              <button
                type="submit"
                className="place-order-btn"
                disabled={cartItems.length === 0}
              >
                Đặt hàng
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
