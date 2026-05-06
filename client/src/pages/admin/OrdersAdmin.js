import API_URL from "../../config";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import styles from "../../assets/css/admin/orderlist.module.css";
  import AdminSidebar from "../../components/admin/Sidebar";
  import AdminHeader from "../../components/admin/HeaderAdmin";

  export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");       // ✅ search
    const [statusFilter, setStatusFilter] = useState("Tất cả"); // ✅ filter

    // Gọi API lấy danh sách hóa đơn
    useEffect(() => {
      fetchOrders();
    }, []);

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/orders/all`);
        setOrders(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách hoá đơn:", err);
      } finally {
        setLoading(false);
      }
    };

    // Cập nhật trạng thái đơn hàng
    const handleStatusChange = async (orderId, newStatus) => {
      try {
        await axios.put(`${API_URL}/api/orders/${orderId}/status`, {
          status: newStatus,
        });
        fetchOrders(); // reload danh sách sau khi cập nhật
      } catch (err) {
        console.error("Lỗi khi cập nhật trạng thái:", err);
      }
    };

    // Lọc danh sách theo search và trạng thái
    const filteredOrders = orders.filter((order) => {
      const name = order.userId?.name?.toLowerCase() || "khách vãng lai";
      const orderId = order._id?.slice(-6).toLowerCase();
      const matchesSearch =
        name.includes(searchTerm.toLowerCase()) ||
        orderId.includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "Tất cả" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    if (loading) return <div className={styles.loading}>Đang tải dữ liệu...</div>;

    return (
      <div className="grid-full-width">
        <div className="grid__row">
          <div className="grid__column-2">
            <AdminSidebar />
          </div>

          <div className="grid__column-10">
            <AdminHeader />

            <div className={styles.wrapper}>
              <h1 className={styles.title}>Quản lý hoá đơn</h1>

              {/* Ô search và filter */}
              <div className={styles.filterBar}>
                <input
                  type="text"
                  placeholder=" Tìm theo tên khách hàng hoặc mã hoá đơn..."
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                  className={styles.filterSelect}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="Tất cả">Tất cả trạng thái</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đang giao hàng">Đang giao hàng</option>
                  <option value="Đã giao">Đã giao</option>
                </select>
              </div>

              {/* ======= BẢNG ======= */}
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
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                        Không tìm thấy hoá đơn phù hợp
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id.slice(-6).toUpperCase()}</td>
                        <td>{order.userId?.name || "Khách vãng lai"}</td>
                        <td>{order.totalAmount.toLocaleString()}₫</td>
                        <td>
                          {order.paymentMethod === "cod" ? "COD" : "Chuyển khoản"}
                        </td>
                        <td>
                          <select
                            className={`${styles.statusSelect} ${
                              order.status === "Đã giao"
                                ? styles.success
                                : order.status === "Đang giao hàng"
                                ? styles.pending
                                : ""
                            }`}
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                          >
                            <option value="Đang xử lý">Đang xử lý</option>
                            <option value="Đang giao hàng">Đang giao hàng</option>
                            <option value="Đã giao">Đã giao</option>
                          </select>
                        </td>
                        <td>
                          {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                        </td>
                        <td>
                          <button
                            className={styles.detailBtn}
                            onClick={() => setSelectedOrder(order)}
                          >
                            Chi tiết
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* ======= MODAL CHI TIẾT ======= */}
              {selectedOrder && (
                <div
                  className={styles.modalOverlay}
                  onClick={() => setSelectedOrder(null)}
                >
                  <div
                    className={styles.modalContent}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2>
                      Chi tiết đơn hàng #{selectedOrder._id.slice(-6).toUpperCase()}
                    </h2>
                    <p>
                      <strong>Khách hàng:</strong>{" "}
                      {selectedOrder.userId?.name || "Khách vãng lai"}
                    </p>
                    <p>
                      <strong>Địa chỉ:</strong>{" "}
                      {selectedOrder.address?.detail}, {selectedOrder.address?.ward},{" "}
                      {selectedOrder.address?.province}
                    </p>
                    <p>
                      <strong>Tổng tiền:</strong>{" "}
                      {selectedOrder.totalAmount.toLocaleString()}₫
                    </p>
                    <hr />
                    <h3>Sản phẩm</h3>
                    <ul className={styles.itemList}>
                      {selectedOrder.items.map((item, idx) => (
                        <li key={idx}>
                          <img
                            src={`${process.env.PUBLIC_URL}/img/${item.image}`}
                            alt={item.productId?.name}
                          />
                          <div>
                            <p>{item.productId?.name}</p>
                            <p>Số lượng: {item.quantity}</p>
                            <p>Giá: {item.price.toLocaleString()}₫</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={styles.closeBtn}
                      onClick={() => setSelectedOrder(null)}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
