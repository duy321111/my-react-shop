import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../assets/css/admin/orderlist.module.css";
import AdminSidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/HeaderAdmin";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Lấy danh sách hoá đơn khi trang load
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/all");
      setOrders(res.data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách hoá đơn:", err);
    } finally {
      setLoading(false);
    }
  };

  //  Cập nhật trạng thái đơn hàng
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
        status: newStatus,
      });
      fetchOrders(); // reload danh sách sau khi cập nhật
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
    }
  };

  if (loading) return <div className={styles.loading}>Đang tải dữ liệu...</div>;

  return (
    <div className="grid-full-width">
      <div className="grid__row">
        <div className="grid__column-2">
          <AdminSidebar/>
          
        </div>
        <div className="grid__column-10">
          <AdminHeader/>
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Quản lý hoá đơn</h1>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Mã hoá đơn</th>
                  <th>Khách hàng</th>
                  <th>Tổng tiền</th>
                  <th>Phương thức</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.slice(-6).toUpperCase()}</td>
                    <td>{order.userId?.name || "Khách vãng lai"}</td>
                    <td>{order.totalAmount.toLocaleString()}₫</td>
                    <td>{order.paymentMethod === "cod" ? "COD" : "Chuyển khoản"}</td>
                    <td>
                      <select
                        className={styles.statusSelect}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        <option value="Đang xử lý">Đang xử lý</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Đã giao">Đã giao</option>
                      </select>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString("vi-VN")}</td>
                    <td>
                      <button
                        className={styles.detailBtn}
                        onClick={() => setSelectedOrder(order)}
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {}
            {selectedOrder && (
              <div className={styles.modalOverlay} onClick={() => setSelectedOrder(null)}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                  <h2>Chi tiết đơn hàng #{selectedOrder._id.slice(-6).toUpperCase()}</h2>
                  <p><strong>Khách hàng:</strong> {selectedOrder.userId?.name || "Khách vãng lai"}</p>
                  <p><strong>Địa chỉ:</strong> {selectedOrder.address?.detail}, {selectedOrder.address?.ward}, {selectedOrder.address?.province}</p>
                  <p><strong>Tổng tiền:</strong> {selectedOrder.totalAmount.toLocaleString()}₫</p>
                  <hr />
                  <h3>Sản phẩm</h3>
                  <ul className={styles.itemList}>
                    {selectedOrder.items.map((item, idx) => (
                      <li key={idx}>
                        <img src={`${process.env.PUBLIC_URL}/img/${item.image}`}  alt={item.productId?.name} />
                        <div>
                          <p>{item.productId?.name}</p>
                          <p>Số lượng: {item.quantity}</p>
                          <p>Giá: {item.price.toLocaleString()}₫</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button className={styles.closeBtn} onClick={() => setSelectedOrder(null)}>Đóng</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
