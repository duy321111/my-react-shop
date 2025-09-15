import React from 'react';

const Cart = () => {
  const cartItems = [
    { name: "Bộ kem đặc trị vùng mặt", price: 200000000, quantity: 3 },
    { name: "aaaa", price: 0, quantity: 0 },
    { name: "Bộ kem đặc trị vùng mặt (dài)", price: 200000000, quantity: 3 },
    // Thêm các item khác tương tự
  ];

  return (
    <div className="cart">
      <h3>3</h3>
      <p>Chưa có sản phẩm</p>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <p>{item.name}</p>
            <p>
              {item.price.toLocaleString()}đ x {item.quantity}
            </p>
            <button>Xóa</button>
          </div>
        ))}
      </div>
      <button>Xem giỏ hàng</button>
    </div>
  );
};

export default Cart;