// import React, { useEffect, useState } from "react";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const userId = localStorage.getItem("userId"); // Lấy từ localStorage

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         if (!userId) return; // Nếu chưa có userId thì không fetch
//         const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
//         const data = await res.json();
//         setCartItems(data?.items || []);
//       } catch (error) {
//         console.error("Lỗi lấy giỏ hàng:", error);
//       }
//     };
//     fetchCart();
//   }, [userId]);

//   const handleRemove = async (productId) => {
//     try {
//       await fetch(`http://localhost:5000/api/cart/${userId}/${productId}`, {
//         method: "DELETE",
//       });
//       setCartItems(cartItems.filter((item) => item.productId !== productId));
//     } catch (error) {
//       console.error("Lỗi xóa sản phẩm:", error);
//     }
//   };

//   return (
//     <div className="cart">
//       <h3>{cartItems.length}</h3>
//       {cartItems.length === 0 && <p>Chưa có sản phẩm</p>}

//       <div className="cart-items">
//         {cartItems.map((item) => (
//           <div key={item.productId} className="cart-item">
//             <p>{item.name}</p>
//             <p>
//               {item.price.toLocaleString()}đ x {item.quantity}
//             </p>
//             <button onClick={() => handleRemove(item.productId)}>Xóa</button>
//           </div>
//         ))}
//       </div>

//       <button>Xem giỏ hàng</button>
//     </div>
//   );
// };

// export default Cart;
