import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const OrderDetail = () => {
  const orderItems = [
    {
      id: 1,
      name: "Bàn phím Corsair K65 Plus Wireless Led RGB/Switch Corsair Red linear...",
      image: "https://product.hstatic.net/1000026716/product/corsair-k65.jpg", // demo link ảnh
      quantity: 1,
      price: 3890000,
    },
    {
      id: 2,
      name: "Chuột Logitech G102 Gen2 Lightsync RGB",
      image: "https://product.hstatic.net/1000026716/product/logitech-g102.jpg",
      quantity: 2,
      price: 350000,
    },
  ];

  const formatPrice = (num) => num.toLocaleString("vi-VN") + "đ";

  return (
    <div className="app__container">
      <Header/>
      <div className="grid">
        <div className="grid__row">
          <div className="order-detail-container">
            <h2>Chi tiết đơn hàng</h2>
            <table className="order-detail-table">
              <thead>
                <tr>
                  <th>TÊN SẢN PHẨM</th>
                  <th>HÌNH ẢNH</th>
                  <th>SỐ LƯỢNG</th>
                  <th>GIÁ SẢN PHẨM</th>
                  <th>TẠM TÍNH</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <img src={item.image} alt={item.name} className="product-img" />
                    </td>
                    <td>{item.quantity}</td>
                    <td>{formatPrice(item.price)}</td>
                    <td>{formatPrice(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="order-summary">
              <p>
                <strong>Tổng tiền:</strong>{" "}
                <span className="total">
                  {formatPrice(
                    orderItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default OrderDetail;
